import { Location } from '@/entities/Location/model/types';
import { FileType } from '@/shared/types/api';

export interface MomentJSONQueryResponse {
  momentId: number;
  isJoined: boolean;
  isClosed: boolean;
  name: string;
  meetAt: string;
  meetingPlaceName: string;
  participantCount: number;
  capacity: number;
  closedAt: string;
  place: Location;
}

export interface MomentType extends MomentJSONQueryResponse {
  file?: FileType;
}

export interface MomentJSONMutationRequest {
  crewId?: number;
  momentName: string;
  meetAt: string;
  place: Location;
  capacity: number;
  closedAt: string;
}
