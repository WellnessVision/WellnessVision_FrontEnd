// useToggle.ts
import { useState } from 'react';

export const useToggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  return [isToggled, toggle] as const;
};
