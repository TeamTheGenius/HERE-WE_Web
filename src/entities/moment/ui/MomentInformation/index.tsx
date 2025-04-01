import temp from '@/shared/assets/temp.jpg';
import styles from './index.module.scss';

function MomentInformation() {
  return (
    <div className={styles.container}>
      <img className={styles.thumbnail} src={temp} alt="모먼트 썸네일" />
      <div className={styles.fieldContainer}>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>모먼트명</h3>
          <p className={styles.fieldMainContent}>피자 탐방하기</p>
        </div>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>만나는 날짜</h3>
          <p className={styles.fieldMainContent}>2025.01.29 화요일 10:00</p>
        </div>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>만나는 장소</h3>
          <div className={styles.fieldContent}>
            <p className={styles.fieldMainContent}>명동교자 이태원점</p>
            <p className={styles.fieldSubContent}>도로명: 서울 용산구 녹사평대로 136</p>
            <p className={styles.fieldSubContent}>지번: 서울 용산구 이태원동 34-149</p>{' '}
            <p className={styles.fieldSubContent}>연락처: 02-790-7300</p>
          </div>
        </div>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>참여/마감 인원</h3>
          <p className={styles.fieldMainContent}>3/10명</p>
        </div>
        <div className={styles.field}>
          <h3 className={styles.fieldTitle}>신청 마감 날짜</h3>
          <p className={styles.fieldMainContent}>2025.01.29 화요일 10:00</p>
        </div>
      </div>
    </div>
  );
}

export default MomentInformation;
