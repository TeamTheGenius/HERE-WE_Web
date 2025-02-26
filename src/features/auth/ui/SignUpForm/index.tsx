import { ProfileForm } from '@/features/auth/ui/ProfileForm';
import { useProfileRegister } from '@/features/auth/model/useProfileRegister';
import { useWatch } from 'react-hook-form';
import { useBlobURL } from '@/shared/hooks/useBlobURL';
import { UserInfoType } from '@/entities/user/model/types';

function SignUpForm(data: UserInfoType) {
  const {
    formMethods: {
      formState: { errors },
      register,
      control,
    },
    handleSubmit,
    handleFileInputClick,
    handleFileInputRef,
    handleNicknameDuplicateCheck,
  } = useProfileRegister(data);

  const watchedFile = useWatch({ control, name: 'image' });
  const watchedNickname = useWatch({ control, name: 'nickname' });
  const profileImagePreview = useBlobURL(watchedFile?.[0]);

  return (
    <ProfileForm handlSubmit={handleSubmit}>
      <ProfileForm.Image
        error={errors.image}
        register={register('image')}
        previewImage={profileImagePreview}
        handleFileInputRef={handleFileInputRef}
        handleInputClick={handleFileInputClick}
      />
      <ProfileForm.Nickname
        error={errors.nickname}
        register={register('nickname')}
        handleDupllicateCheck={handleNicknameDuplicateCheck}
        initialNickname=""
        watchedNickname={watchedNickname}
      />
      <ProfileForm.SubmitButton>가입하기</ProfileForm.SubmitButton>
    </ProfileForm>
  );
}

export default SignUpForm;
