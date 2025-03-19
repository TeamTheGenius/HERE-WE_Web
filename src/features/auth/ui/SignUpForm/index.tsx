import { ProfileForm } from '@/features/auth/ui/ProfileForm';
import { useProfileRegister } from '@/features/auth/model/useProfileRegister';
import { useWatch } from 'react-hook-form';
import { useBlobURL } from '@/shared/hooks/useBlobURL';
import { UserInfoType } from '@/entities/user/model/types';
import { postAuthSignup } from '@/entities/user/api/postAuthSignup';
import { useNavigate } from 'react-router-dom';
import { postAuth } from '../../api/postAuth';
import { routePaths } from '@/app/routes/path';

interface SignUpForm extends UserInfoType {
  token: string;
}

function SignUpForm({ nickname, image, token }: SignUpForm) {
  const {
    formMethods: {
      formState: { errors },
      register,
      control,
      getValues,
    },
    checkCanSubmit,
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
    const canSubmit = await checkCanSubmit();
    if (!canSubmit) return;
    const nickname = getValues('nickname');
    const { userId } = await postAuthSignup(token, nickname);
    await postAuth(userId);
    navigate(routePaths.main);
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
