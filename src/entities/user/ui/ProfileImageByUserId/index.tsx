import { useQuery } from '@tanstack/react-query';
import { userQueries } from '../../query/userQueries';
import ProfileImageBase, { ProfileImageBaseProps } from '../ProfileImageBase';

export interface ProfileImageByUserIdProps extends Omit<ProfileImageBaseProps, 'src'> {
  userId: number;
}

function ProfileImageByUserId({ alt, className, userId, size }: ProfileImageByUserIdProps) {
  const { data } = useQuery({ ...userQueries.profileFile({ userId }) });

  return <ProfileImageBase src={data?.source || ''} alt={alt} size={size} className={className} />;
}

export default ProfileImageByUserId;
