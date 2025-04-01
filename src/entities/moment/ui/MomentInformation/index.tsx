import temp from '@/shared/assets/temp.jpg';
import styles from './index.module.scss';
import { useMomentDetailWithFile } from '../../query/useMomentDetailWithFile';
import { useParams } from 'react-router-dom';

function MomentInformation() {
  const { momentId } = useParams();
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));

  if (!momentDetail) return null;

  return (
    <div className={styles.container}>
      <img className={styles.thumbnail} src={temp} alt="모먼트 썸네일" />
      <div className={styles.fieldContainer}>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>모먼트명</h3>
          <p className={styles.fieldMainContent}>{momentDetail.name}</p>
        </div>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>만나는 날짜</h3>
          <p className={styles.fieldMainContent}>{momentDetail.meetAt}</p>
        </div>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>만나는 장소</h3>
          <div className={styles.fieldContent}>
            <p className={styles.fieldMainContent}>{momentDetail.place.placeName}</p>
            <p className={styles.fieldSubContent}>도로명: {momentDetail.place.roadAddressName}</p>
            <p className={styles.fieldSubContent}>지번: {momentDetail.place.addressName}</p>
            <p className={styles.fieldSubContent}>연락처: {momentDetail.place.phone}</p>
          </div>
        </div>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>참여/마감 인원</h3>
          <p className={styles.fieldMainContent}>
            {momentDetail.participantCount}/{momentDetail.capacity}명
          </p>
        </div>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>신청 마감 날짜</h3>
          <p className={styles.fieldMainContent}>{momentDetail.closedAt}</p>
        </div>
      </div>
    </div>
  );
}

export default MomentInformation;
