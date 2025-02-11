import Button from '../../../../shared/ui/Button';
import styles from './index.module.scss';

interface NicknameInputProps {
  handleNicknameChange: (nickname: string) => void;
}

function NicknameInput({ handleNicknameChange }: NicknameInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNicknameChange(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input type="text" placeholder="닉네임(2~20)" onChange={handleInputChange} className={styles.input} />
        <Button variant="secondary" text="중복확인" size="medium" />
      </div>
      <span className={styles.message}>중복된 닉네임입니다.</span>
    </div>
  );
}

export default NicknameInput;
