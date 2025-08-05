import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Location } from '@/entities/Location/model/types';
import { MomentPlace } from '@/features/moment/model/types';
import { useDeleteMomentPlace } from '@/features/moment/query/useDeleteMomentPlace';
import { useParams } from 'react-router-dom';
import { usePostMomentPlace } from '@/features/moment/query/usePostMomentPlace';
import { useAddToast } from '@/shared/hooks/useToast';
import { InfiniteScroll } from '@/shared/types/api';
import { InfiniteData } from '@tanstack/react-query';
import orangeMarker from '@/shared/assets/orange-marker.svg';
import blueMarker from '@/shared/assets/blue-marker.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

declare namespace Kakao {
  namespace Maps {
    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(position: LatLng): void;
      getCenter(): LatLng;
      setLevel(level: number): void;
      getLevel(): number;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      getMap(): Map | null;
      setPosition(position: LatLng): void;
      getPosition(): LatLng;
    }

    class InfoWindow {
      constructor(options: InfoWindowOptions);
      open(map: Map, marker?: Marker): void;
      close(): void;
      setContent(content: string): void;
      getContent(): string;
    }

    class LatLng {
      constructor(latitude: number, longitude: number);
      getLat(): number;
      getLng(): number;
    }

    interface MapOptions {
      center: LatLng;
      level?: number;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      clickable?: boolean;
    }

    interface InfoWindowOptions {
      position?: LatLng;
      content?: string;
    }
  }
}

// 상수 정의
const MARKER_SIZE = { width: 36, height: 48 };
const MARKER_OFFSET = { x: 18, y: 48 };

const { kakao } = window;

interface MapProps {
  momentPlaces: MomentPlace[];
  searchPlaces: InfiniteData<InfiniteScroll<Location>> | undefined;
  focus: Location | MomentPlace | undefined;
}

function MomentPlaceMap({ searchPlaces, momentPlaces, focus }: MapProps) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Kakao.Maps.Map | null>(null);
  const focusMarkerRef = useRef<Kakao.Maps.Marker | null>(null);
  const infoWindowRef = useRef<Kakao.Maps.InfoWindow | null>(null);

  // 각각 따로 Map으로 관리
  const searchMarkersRef = useRef<Map<string, Kakao.Maps.Marker>>(new Map());
  const momentMarkersRef = useRef<Map<string, Kakao.Maps.Marker>>(new Map());

  const { mutateAsync: deletePlace } = useDeleteMomentPlace();
  const { momentId } = useParams();
  const { mutateAsync: addPlace } = usePostMomentPlace();
  const addToast = useAddToast();

  const handlePlaceDelete = async (place: MomentPlace) => {
    await deletePlace({ momentId: Number(momentId), index: place.index });
  };

  const handlePlaceAdd = async (place: Location) => {
    await addPlace({ place, momentId: Number(momentId) });

    addToast({
      type: 'success',
      message: `'${place.placeName}'을(를) 추가했어요`,
    });
  };

  const checkMomentPlace = (place: Location | MomentPlace): place is MomentPlace => {
    return (place as MomentPlace).index !== undefined;
  };

  // 포커스 마커와 인포윈도우를 제거하는 함수
  const clearFocus = () => {
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
      infoWindowRef.current = null;
    }

    if (focusMarkerRef.current) {
      focusMarkerRef.current.setMap(null);
      focusMarkerRef.current = null;
    }
  };

  // 지도 초기화
  useEffect(() => {
    if (!container.current || !momentPlaces[0]) return;

    const defaultCenter = momentPlaces[0];
    const centerPosition = new kakao.maps.LatLng(defaultCenter.y, defaultCenter.x);

    const map = new kakao.maps.Map(container.current, {
      center: centerPosition,
      level: 3,
    });

    mapRef.current = map;
  }, [momentPlaces]);

  // 모멘트 장소 마커 관리
  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 마커 제거
    const momentMarker = momentMarkersRef.current;
    momentMarker.forEach((marker) => marker.setMap(null));
    momentMarker.clear();

    // 새 마커 생성
    momentPlaces.forEach((place) => {
      const imageSize = new kakao.maps.Size(MARKER_SIZE.width, MARKER_SIZE.height);
      const imageOption = { offset: new kakao.maps.Point(MARKER_OFFSET.x, MARKER_OFFSET.y) };
      const markerImage = new kakao.maps.MarkerImage(blueMarker, imageSize, imageOption);
      const markerPosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(mapRef.current);
      momentMarker.set(String(place.id), marker);
    });
  }, [momentPlaces]);

  // 검색 결과 마커 관리
  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 마커 제거
    const searchResultMarker = searchMarkersRef.current;
    searchResultMarker.forEach((marker) => marker.setMap(null));
    searchResultMarker.clear();

    // 새 마커 생성
    searchPlaces?.pages?.forEach((page) => {
      page.content.forEach((place) => {
        const imageSize = new kakao.maps.Size(MARKER_SIZE.width, MARKER_SIZE.height);
        const markerColor = momentMarkersRef.current.has(String(place.id)) ? blueMarker : orangeMarker;
        const imageOption = { offset: new kakao.maps.Point(MARKER_OFFSET.x, MARKER_OFFSET.y) };
        const markerImage = new kakao.maps.MarkerImage(markerColor, imageSize, imageOption);
        const markerPosition = new kakao.maps.LatLng(place.y, place.x);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(mapRef.current);
        searchResultMarker.set(String(place.id), marker);
      });
    });
  }, [searchPlaces, momentPlaces]);

  useEffect(() => {
    if (!mapRef.current || !focus) return;

    // 기존 포커스 마커와 인포윈도우 제거
    clearFocus();

    // 지도 중심 변경
    const focusPosition = new kakao.maps.LatLng(focus.y, focus.x);
    mapRef.current.setCenter(focusPosition);

    // 인포 윈도우 UI 반환 함수
    const getMomentPlaceInfoWindow = (place: MomentPlace) => `
        <div class="${styles.infoWindow}">
          <div class="${styles.infoWindowTitle}">${place.index}. ${place.placeName}</div>
          ${
            place.index !== 1
              ? `<button id="removeButton" data-place='${JSON.stringify(place)}' class="${styles.infoWindowButton}">
                  삭제
                </button>`
              : ''
          }
        </div>
      `;
    const getSearchPlaceInfoWindow = (place: Location) => `
           <div class="${styles.infoWindow}">
            <div class="${styles.infoWindowTitle}">${place.placeName}</div>
              <button id="addButton" data-place='${JSON.stringify(place)}' class="${styles.infoWindowButton}">
                  추가
              </button>
          </div>
        `;

    // 인포 윈도우 생성
    let targetMarker = null;
    if (momentMarkersRef.current.has(String(focus.id))) targetMarker = momentMarkersRef.current.get(String(focus.id));
    else if (searchMarkersRef.current.has(String(focus.id)))
      targetMarker = searchMarkersRef.current.get(String(focus.id));
    else return;

    const content = checkMomentPlace(focus) ? getMomentPlaceInfoWindow(focus) : getSearchPlaceInfoWindow(focus);
    const infoWindow = new kakao.maps.InfoWindow({ position: targetMarker, content });
    infoWindow.open(mapRef.current, targetMarker);
    infoWindowRef.current = infoWindow;

    // 이벤트 부착
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      switch (target?.id) {
        case 'removeButton':
          const removedPlaceString = target.dataset.place;
          if (!removedPlaceString) break;
          const removedPlace = JSON.parse(removedPlaceString);
          if (removedPlace) handlePlaceDelete(removedPlace);
          clearFocus();
          break;

        case 'addButton':
          const placeString = target.dataset.place;
          if (!placeString) break;
          const place = JSON.parse(placeString);
          if (place) handlePlaceAdd(place);
          break;

        default:
          break;
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [focus]);

  return <div className={styles.map} ref={container}></div>;
}

export default MomentPlaceMap;
