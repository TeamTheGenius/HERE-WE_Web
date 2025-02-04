import { useState } from 'react';
import clsx from 'clsx';
import style from './MyComponent.module.scss';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(count + 1);

  return (
    <div>
      {/* 'jsx-props-no-spreading' rule is violated here */}
      <button onClick={handleClick} className={clsx(style.test)}>
        Count: {count}
      </button>
    </div>
  );
};

export default MyComponent;
