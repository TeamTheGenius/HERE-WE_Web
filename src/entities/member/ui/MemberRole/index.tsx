import { cn } from '@/shared/lib/cn';
import styles from './index.module.scss';

interface MemberRoleProps {
  role: '크루리더' | '크루원';
}

function MemberRole({ role }: MemberRoleProps) {
  return (
    <span
      className={cn({
        [styles.crewLeader]: role === '크루리더',
        [styles.crewMember]: role === '크루원',
      })}
    >
      {role}
    </span>
  );
}

export default MemberRole;
