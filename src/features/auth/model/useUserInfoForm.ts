import { useState } from 'react';

interface UseUserInfoFormProps {
  initialImage?: string;
  initialNickname?: string;
}

export const useUserInfoForm = ({ initialImage = '', initialNickname = '' }: UseUserInfoFormProps = {}) => {
  const [image, setImage] = useState(initialImage);
  const [nickname, setNickname] = useState(initialNickname);

  const handleNicknameChange = (nickname: string) => {
    setNickname(nickname);
  };

  const handleImageChange = (file: File) => {
    const image = URL.createObjectURL(file);
    setImage(image);
  };

  return {
    image,
    nickname,
    handleNicknameChange,
    handleImageChange,
  };
};
