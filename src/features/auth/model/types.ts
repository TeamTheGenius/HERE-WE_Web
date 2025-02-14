import type { UseFormReturn } from 'react-hook-form';
import { ProfileImageProps, UserInfoType } from '../../../entities/user/model/types';

export interface ProfileImageInputProps extends ProfileImageProps {
  formMethods: UseFormReturn<UserInfoType>;
}

export type SocialProvider = 'google' | 'naver' | 'kakao';
