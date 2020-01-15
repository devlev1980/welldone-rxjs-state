export interface Category {
  id: number;
  name: string;
  location: ILocation;
}
interface ILocation {
  name: string;
  address: string;
  coordinates: ICoordinate;
  category: string;
}
interface ICoordinate {
  longitude: number;
  latitude: number;
}

