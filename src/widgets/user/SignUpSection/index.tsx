import { getAuthProfileImage } from '@/features/auth/api/getAuthProfileImage';
import { useSearchParams } from 'react-router-dom';
import { makeSourceToFileList } from '@/shared/helper/sourceToFileList';
import SignUpForm from '@/features/auth/ui/SignUpForm';
import { useEffect, useState } from 'react';

function SignUpSection() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [initialFileList, setInitialFileList] = useState<FileList>();

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      const { source, fileEnv } = await getAuthProfileImage(token);
      const fileList = await makeSourceToFileList(source, 'profile-image', fileEnv);
      setInitialFileList(fileList);
    };
    fetchData();
  }, [token]);

  if (!token || !initialFileList) return null;

  return <SignUpForm nickname="" image={initialFileList} token={token} />;
}

export default SignUpSection;
