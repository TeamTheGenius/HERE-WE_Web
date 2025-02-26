import Header from '@/app/layouts/Header';
import { TextArea } from '@/shared/ui/TextArea';
import { useForm, useWatch } from 'react-hook-form';

interface UserInfoType {
  nickname: string;
}

function Main() {
  const { register, control } = useForm<UserInfoType>({
    defaultValues: {
      nickname: 'seona',
    },
  });
  const watchedText = useWatch({ control, name: 'nickname' });

  return (
    <>
      <Header />
      <form>
        <TextArea>
          <TextArea.Label>라벨</TextArea.Label>
          <TextArea.Area
            maxLength={500}
            placeholder="크루를 소개해주세요(~1000)"
            hasError={false}
            {...register('nickname')}
          />
          <TextArea.Message variant="information">{watchedText.length}</TextArea.Message>
        </TextArea>
      </form>
    </>
  );
}

export default Main;
