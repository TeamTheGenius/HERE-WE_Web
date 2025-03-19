export type FileEnvType = 'LOCAL' | 'CLOUD';
export interface FileType {
  fileId: number;
  source: string;
  fileEnv: FileEnvType;
}
