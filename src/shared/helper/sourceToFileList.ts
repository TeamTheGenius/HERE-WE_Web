import { base64ToFileList, checkBase64, checkURL, URLToFileList } from '../lib/fileFormatter';

export const makeSourceToFileList = async (source: string, fileName: string, fileEnv: 'LOCAL' | 'CLOUD') => {
  if (checkBase64(source) || fileEnv === 'LOCAL') {
    return await base64ToFileList([{ base64: source, fileName, fileType: 'image/jpeg' }]);
  } else if (checkURL(source) || fileEnv === 'CLOUD') return await URLToFileList([{ url: source, fileName }]);
};
