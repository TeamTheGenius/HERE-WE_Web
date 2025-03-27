export interface Location {
  placeName: string;
  addressName: string;
  roadAddressName: string;
  placeURL: string;
  phone: string;
  x: number;
  y: number;
}

export interface LocationAboutServer {
  place_name: string;
  x: number;
  y: number;
  address_name: string;
  road_address_name: string;
  place_url: string;
  phone: string;
}
