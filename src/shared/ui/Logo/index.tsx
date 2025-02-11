import styles from './index.module.scss';

interface LogoProps {
  haveIntroduce: boolean;
}

function Logo({ haveIntroduce }: LogoProps) {
  return (
    <hgroup className={styles.wrapper}>
      {haveIntroduce && <h2 className="heading-small text-primary">모임을 더 쉽게, 소중한 순간은 더 오래</h2>}
      <h1 className="text-brand display-large">HERE:WE</h1>
    </hgroup>
  );
}

export default Logo;
