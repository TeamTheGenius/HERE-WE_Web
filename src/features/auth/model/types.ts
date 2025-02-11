import { ProfileImageProps } from '../../../entities/user/model/types';

export interface EditableProfileImageProps extends ProfileImageProps {
  handleImageChange: (file: File) => void;
}

export type SocialProvider = 'google' | 'naver' | 'kakao';
