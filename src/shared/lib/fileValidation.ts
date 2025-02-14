export const FILE_SIZE_UNITS = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
} as const;

export type FileSizeUnit = keyof typeof FILE_SIZE_UNITS;

export const validateFileSize = (file: File, maxSize: number, unit: FileSizeUnit = 'MB') => {
  const fileSize = file.size / FILE_SIZE_UNITS[unit];
  return fileSize <= maxSize ? true : `파일 크기는 ${maxSize}${unit}를 초과할 수 없습니다.`;
};
