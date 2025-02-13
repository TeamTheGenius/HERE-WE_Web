import { ProfileImageProps } from '../../../entities/user/model/types';

export interface EditableProfileImageProps extends ProfileImageProps {
  onImageChange: (file: File) => void;
}

export type SocialProvider = 'google' | 'naver' | 'kakao';
