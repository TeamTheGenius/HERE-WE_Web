import BaseCrewHeader from '@/widgets/crew/BaseCrewHeader';
import MemberListSection from '@/widgets/member/MemberListSection';
import CrewInviteButton from '@/widgets/member/CrewInviteButton';
import styles from './index.module.scss';
import Skeleton from '@/shared/ui/Skeleton';
import MemberListSkeleton from '@/entities/member/ui/MemberListSkeleton';
import { Suspense } from 'react';

function CrewMembersPage() {
  return (
    <div className={styles.wapper}>
      <Suspense fallback={<Skeleton width="10rem" height="2rem" variant="rect" />}>
        <BaseCrewHeader />
      </Suspense>
      <div>
        <CrewInviteButton />
      </div>
      <Suspense fallback={<MemberListSkeleton />}>
        <MemberListSection />
      </Suspense>
    </div>
  );
}

export default CrewMembersPage;
