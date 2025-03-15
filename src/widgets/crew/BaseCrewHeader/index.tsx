import Icon from '@/shared/ui/Icon';
import styles from './index.module.scss';

const data = { name: 'TeamTheGenius', participants: 25 };

function BaseCrewHeader() {
  return (
    <div className={styles.crewHeader}>
      <h2 className={styles.crewName}>{data.name}</h2>
      <div className={styles.crewInformation}>
        <Icon icon="people-stroke" iconSize="20" color="text-primary" />
        <span className={styles.crewParticipants}>{data.participants}명</span>
      </div>
    </div>
  );
}

export default BaseCrewHeader;
