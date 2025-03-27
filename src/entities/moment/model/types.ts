import { FileType } from '@/shared/types/api';

export interface MomentJSONType {
  crewId: number;
  name: string;
  date: string;
  location: string;
  capacity: number;
  participantCount: number;
  endDate: string;
}

export interface MomentType extends MomentJSONType {
  file?: FileType;
}
