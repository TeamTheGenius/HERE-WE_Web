import styles from './index.module.scss';
import { ProfileNickname } from '@/entities/user/ui/ProfileNickname';
import MemberJoinedDate from '@/entities/member/ui/MemberJoinedDate';
import MemberRole from '@/entities/member/ui/MemberRole';
import Button from '@/shared/ui/Button';
import ProfileImageBase from '@/entities/user/ui/ProfileImageBase';

export type CrewMemberRoleType = '크루리더' | '크루원';

export interface CrewMemberType {
  id: number;
  image: string;
  nickname: string;
  role: CrewMemberRoleType;
  date: string;
}

interface MemberListProps {
  data: CrewMemberType[];
  isCrewLeader: boolean;
  handleKick: (nickname: string) => void;
}

function MemberList({ data, isCrewLeader, handleKick }: MemberListProps) {
  return (
    <>
      <ul className={styles.memberList}>
        {data.map((el) => (
          <li className={styles.memberItem} key={el.id}>
            <div className={styles.informationContainer}>
              <ProfileImageBase size="medium" src={el.image} />
              <div className={styles.textInformationContainer}>
                <div className={styles.textCoreInformationContainer}>
                  <ProfileNickname size="md" className={styles.textInformationNickname}>
                    {el.nickname}
                  </ProfileNickname>
                  {el.role === '크루리더' && <MemberRole role={el.role} />}
                </div>
                <MemberJoinedDate>크루 참여 {el.date}</MemberJoinedDate>
              </div>
            </div>
            {isCrewLeader && el.role === '크루원' && (
              <Button variant="secondary" onClick={() => handleKick(el.nickname)}>
                내보내기
              </Button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MemberList;
