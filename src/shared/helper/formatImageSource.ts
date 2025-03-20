export const formatImageSource = (fileEnv: 'LOCAL' | 'CLOUD', source: string, mimeType: string = 'image/png') => {
  if (fileEnv === 'LOCAL' && !source.startsWith('data:image/')) {
    return `data:${mimeType};base64,${source}`;
  }
  return source;
};
