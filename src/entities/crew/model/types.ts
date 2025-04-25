import { FileType } from '@/shared/types/api';

export interface CrewJSONType {
  crewId: number;
  name: string;
  leaderNickname: string;
  role: 'LEADER' | 'MEMBER';
  introduce: string;
  participantCount: number;
}

export interface CrewType extends CrewJSONType {
  file?: FileType;
}

export interface CrewJSONMutationRequest {
  crewId?: number;
  name: string;
  introduce: string;
}

export interface CrewJSONMutationResponse {
  crewId: number;
  name: string;
  participantCount: number;
}
