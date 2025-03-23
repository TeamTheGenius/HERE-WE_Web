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
