import { Location } from '@/entities/Location/model/types';

export interface MomentFormType {
  title: string;
  image: FileList | undefined;
  participantCountLimit: number | undefined;
  deadlineDateTime: string;
  applicationDeadline: string;
  meetingLocation: Location | undefined;
}
