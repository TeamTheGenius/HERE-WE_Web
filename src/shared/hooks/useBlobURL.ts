import { useEffect, useState } from 'react';

export const useBlobURL = (file: File | Blob | undefined) => {
  const [blobURL, setBlobURL] = useState<string>('');

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBlobURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return blobURL;
};
