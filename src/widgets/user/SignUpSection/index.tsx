import { getAuthProfileImage } from '@/features/auth/api/getAuthProfileImage';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { makeSourceToFileList } from '@/shared/helper/sourceToFileList';
import SignUpForm from '@/features/auth/ui/SignUpForm';

function SignUpSection() {
  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get('id'));

  const { data } = useQuery({
    queryKey: ['profileImage', userId],
    queryFn: async () => {
      return await getAuthProfileImage(userId);
    },
  });

  if (!data) return null;

  const { source, fileEnv } = data;
  const initialImage = makeSourceToFileList(fileEnv, source, 'profile-image');

  if (!initialImage) return null;

  return <SignUpForm nickname="" image={initialImage} userId={userId} />;
}

export default SignUpSection;
