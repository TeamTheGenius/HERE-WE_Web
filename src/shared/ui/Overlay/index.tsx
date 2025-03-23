import styles from './index.module.scss';

interface OverlayProps {
  handleClick: () => void;
}

function Overlay({ handleClick }: OverlayProps) {
  return <div className={styles.overlay} onClick={handleClick}></div>;
}

export default Overlay;
