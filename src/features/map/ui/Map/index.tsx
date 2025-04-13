import { useEffect, useRef } from 'react';
import styles from './index.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function Map() {
  const container = useRef(null);
  useEffect(() => {
    const position = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: position,
      level: 3,
    };
    new kakao.maps.Map(container.current, options);
  }, []);
  return <div className={styles.map} ref={container}></div>;
}

export default Map;
