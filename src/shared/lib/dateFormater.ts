export const formatLocalDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const formatDDay = (date: Date) => {
  const today = new Date();
  const targetDate = new Date(date);

  // 날짜 부분만 비교하기 위해 시간을 초기화
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  // 두 날짜의 차이를 밀리초 단위로 계산
  const diffTime = targetDate.getTime() - today.getTime();

  // 밀리초를 일 단위로 변환
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'D-Day';
  if (diffDays > 0) return `D-${diffDays}`;
  else return `D+${Math.abs(diffDays)}`;
};
