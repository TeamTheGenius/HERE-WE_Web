import { Location } from '@/entities/Location/model/types';
import { FileType } from '@/shared/types/api';

export interface MomentFormType {
  name: string;
  image: FileList | undefined;
  capacity: number | undefined;
  meetAt: string;
  closedAt: string;
  place: Location | undefined;
}

export interface MomentPlace extends Location {
  index: number;
}

export interface MomentPlaces {
  momentId: number;
  places: MomentPlace[];
  count: number;
}

export interface UpcomingMomentJSON {
  momentId: number;
  crewId: number;
  crewName: string;
  momentName: string;
  meetAt: string;
  meetPlaceName: string;
}

export interface UpcomingMoment extends UpcomingMomentJSON {
  file?: FileType;
}
