export interface CrewFormType {
  title: string;
  image: FileList | undefined;
  introduce: string;
}

export interface CrewProfile {
  nickname: string;
  role: 'LEADER' | 'MEMBER';
}
