import { Location } from '@/entities/Location/model/types';
import { FileType } from '@/shared/types/api';

export interface MomentJSONType {
  momentId: number;
  status: '참여가능' | '참여중' | '마감';
  name: string;
  meetAt: string;
  meetingPlaceName: string;
  participantCount: number;
  capacity: number;
  closedAt: string;
  place: Location;
}

export interface MomentType extends MomentJSONType {
  file?: FileType;
}
