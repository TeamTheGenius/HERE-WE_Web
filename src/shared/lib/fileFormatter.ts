interface Base64FileInfo {
  base64: string;
  fileName: string;
  fileType: string;
}

interface URLFileInfo {
  url: string;
  fileName: string;
}

export const checkURL = (source: string) => {
  return /^(https?:\/\/|\/)/.test(source);
};

export const checkBase64 = (source: string) => {
  return /^data:image\/[a-zA-Z]+;base64,/.test(source);
};

export const base64ToFileList = async (files: Base64FileInfo[]) => {
  const dataTransfer = new DataTransfer();

  const processFiles = files.map(async ({ base64, fileName, fileType }) => {
    const base64WithMeta = base64.includes('data:') ? base64 : `data:${fileType};base64,${base64}`;
    const base64Data = base64WithMeta.split(';base64,').pop();

    if (!base64Data) return;

    const byteString = atob(base64Data);
    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: fileType });
    const file = new File([blob], fileName, { type: fileType });

    dataTransfer.items.add(file);
  });

  await Promise.all(processFiles);
  return dataTransfer.files;
};

export const URLToFileList = async (files: URLFileInfo[]) => {
  const dataTransfer = new DataTransfer();

  const fetchFiles = files.map(async ({ url, fileName }) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileType = blob.type;

    const file = new File([blob], fileName, { type: fileType });
    dataTransfer.items.add(file);
  });

  await Promise.all(fetchFiles);
  return dataTransfer.files;
};
