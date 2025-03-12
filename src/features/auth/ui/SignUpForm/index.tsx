import { ProfileForm } from '@/features/auth/ui/ProfileForm';
import { useProfileRegister } from '@/features/auth/model/useProfileRegister';
import { useWatch } from 'react-hook-form';
import { useBlobURL } from '@/shared/hooks/useBlobURL';
import { UserInfoType } from '@/entities/user/model/types';
import { postAuthSignup } from '@/entities/user/api/postAuthSignup';
import { useNavigate } from 'react-router-dom';

interface SignUpForm extends UserInfoType {
  userId: number;
}

function SignUpForm({ nickname, image, userId }: SignUpForm) {
  const {
    formMethods: {
      formState: { errors },
      register,
      control,
      getValues,
    },
    handleSubmit: checkSignUpValidation,
    handleFileInputClick,
    mergedRef,
    handleNicknameDuplicateCheck,
  } = useProfileRegister({ nickname, image });
  const navigate = useNavigate();

  const watchedFile = useWatch({ control, name: 'image' });
  const watchedNickname = useWatch({ control, name: 'nickname' });
  const profileImagePreview = useBlobURL(watchedFile?.[0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkSignUpValidation();

    const nickname = getValues('nickname');
    await postAuthSignup(userId, nickname);

    navigate('/main');
  };

  return (
    <ProfileForm handlSubmit={handleSubmit}>
      <ProfileForm.Image
        error={errors.image}
        register={register('image')}
        previewImage={profileImagePreview}
        mergedRef={mergedRef}
        handleInputClick={handleFileInputClick}
      />
      <ProfileForm.Nickname
        error={errors.nickname}
        register={register('nickname')}
        handleDupllicateCheck={handleNicknameDuplicateCheck}
        initialNickname={nickname}
        watchedNickname={watchedNickname}
      />
      <ProfileForm.SubmitButton>가입하기</ProfileForm.SubmitButton>
    </ProfileForm>
  );
}

export default SignUpForm;
