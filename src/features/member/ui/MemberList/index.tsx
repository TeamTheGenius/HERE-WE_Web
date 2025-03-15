import ProfileImage from '@/entities/user/ui/ProfileImage';
import styles from './index.module.scss';
import { ProfileNickname } from '@/entities/user/ui/ProfileNickname';
import MemberJoinedDate from '@/entities/member/ui/MemberJoinedDate';
import MemberRole from '@/entities/member/ui/MemberRole';
import Button from '@/shared/ui/Button';

interface Data {
  id: number;
  image: string;
  nickname: string;
  role: '크루리더' | '크루원';
  date: string;
}

interface MemberListProps {
  data: Data[];
  isCrewLeader: boolean;
}

function MemberList({ data, isCrewLeader }: MemberListProps) {
  return (
    <ul className={styles.memberList}>
      {data.map((el) => (
        <li className={styles.memberItem} key={el.id}>
          <div className={styles.informationContainer}>
            <ProfileImage size="medium" src={el.image} />
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
          {isCrewLeader && <Button variant="secondary">내보내기</Button>}
        </li>
      ))}
    </ul>
  );
}

export default MemberList;
