import UpcomingMomentList from '@/entities/moment/ui/UpcomingMomentList';
import CardListSkeleton from '@/shared/ui/CardListSkeleton';
import { TitledLayout } from '@/shared/ui/TitledLayout';
import { Suspense } from 'react';

function UpcomingMomentsPage() {
  return (
    <TitledLayout>
      <TitledLayout.Title>다가오는 모먼트</TitledLayout.Title>
      <TitledLayout.Content>
        <Suspense fallback={<CardListSkeleton direction="grid" />}>
          <UpcomingMomentList />
        </Suspense>
      </TitledLayout.Content>
    </TitledLayout>
  );
}

export default UpcomingMomentsPage;
