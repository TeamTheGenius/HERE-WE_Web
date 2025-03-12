import { useRef, useState } from 'react';
import { type UseFormRegister, type FieldValues, type Path } from 'react-hook-form';

export const useFileInput = <T extends FieldValues>(register: UseFormRegister<T>, fieldName: Path<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previousFile, setPreviousFile] = useState<File>();

  const mergedRef = (element: HTMLInputElement) => {
    register(fieldName).ref(element);
    inputRef.current = element;
  };

  const handleFileInputClick = () => {
    inputRef.current?.click();
  };

  const restorePreviousFile = () => {
    if (!previousFile) return;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(previousFile);

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return restorePreviousFile();
    }

    setPreviousFile(selectedFile);
  };

  return {
    handleFileInputClick,
    handleFileChange,
    mergedRef,
  };
};
