import { Location } from '@/entities/Location/model/types';

export interface MomentFormType {
  name: string;
  image: FileList | undefined;
  capacity: number | undefined;
  meetAt: string;
  closedAt: string;
  place: Location | undefined;
}
