import styles from './index.module.scss';

type SVGIconID =
  | 'calendar'
  | 'kakao'
  | 'home'
  | 'naver'
  | 'pencil'
  | 'people'
  | 'people-stroke'
  | 'crown'
  | 'google'
  | 'sound'
  | 'chat'
  | 'send';

type Fill =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'placeholder'
  | 'disabled'
  | 'brand'
  | 'link'
  | 'link-hover'
  | 'notice';

interface SVGIconProps {
  id: SVGIconID;
  fill: Fill;
}

function SVGIcon({ id, fill }: SVGIconProps) {
  return (
    <svg width={20} height={20} className={styles[`svg--${fill}`]}>
      <use href={`#${id}`}></use>
    </svg>
  );
}

export default SVGIcon;
