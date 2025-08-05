import { useMomentRegister } from '@/features/moment/hook/useMomentRegister';
import MomentFormField from '../MomentFormField';
import { useCrewWithFile } from '@/entities/crew/query/useCrewWithFile';

interface MomentCreateContentProps {
  crewId: number;
  momentRegister: ReturnType<typeof useMomentRegister>;
}

function MomentCreateContent({ momentRegister, crewId }: MomentCreateContentProps) {
  const { data: crewData } = useCrewWithFile(crewId);

  if (!crewData) return;

  return <MomentFormField momentRegister={momentRegister} crewName={crewData.name} />;
}

export default MomentCreateContent;
