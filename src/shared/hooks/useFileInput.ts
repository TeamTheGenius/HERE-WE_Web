import { useRef, useState } from 'react';
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { validateFileSize } from '../lib/fileValidation';

interface FileState {
  src: string;
  file: File | null;
}

export const useFileInput = <T extends FieldValues>(register: UseFormRegister<T>, fieldName: Path<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previousImage, setPreviousImage] = useState<FileState>({
    src: '',
    file: null,
  });

  const handleFileInputRef = (element: HTMLInputElement) => {
    register(fieldName).ref(element);
    inputRef.current = element;
  };

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      if (!previousImage.file) return;

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(previousImage.file);

      if (inputRef.current) {
        inputRef.current.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
      return;
    }

    if (previousImage.src) {
      URL.revokeObjectURL(previousImage.src);
    }

    const newPreviewURL = URL.createObjectURL(selectedFile);
    setPreviousImage({ src: newPreviewURL, file: selectedFile });
  };

  const validateFirstFileSize = (files: FileList | undefined) => {
    const file = files?.[0];
    if (!file) return true;
    return validateFileSize(file, 5, 'MB');
  };

  const fileRegister = register(fieldName, {
    validate: { fileSize: validateFirstFileSize },
    onChange: handleFileChange,
  });

  return {
    previousImage,
    handlers: {
      handleInputClick,
      handleFileChange,
      handleFileInputRef,
      fileRegister,
    },
  };
};
