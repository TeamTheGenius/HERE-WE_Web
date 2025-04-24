import { createContext, PropsWithChildren, useContext, useState } from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';

interface MainProps extends PropsWithChildren {
  initialIndex?: number;
  handleTabChange?: (index: number) => void;
}

interface TabTriggerProps extends PropsWithChildren {
  index: number;
}

interface TabPanelProps extends PropsWithChildren {
  index: number;
}

interface TabContextProps {
  activeIndex: number;
  goToTab: (index: number) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

function Main({ children, initialIndex = 0, handleTabChange }: MainProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goToTab = (index: number) => {
    setActiveIndex(index);
    if (handleTabChange) handleTabChange(index);
  };

  return <TabContext.Provider value={{ activeIndex, goToTab }}>{children}</TabContext.Provider>;
}

function TabTrigger({ index, children }: TabTriggerProps) {
  const tabContext = useContext(TabContext);
  if (!tabContext) return;

  const { goToTab, activeIndex } = tabContext;
  const isActive = index === activeIndex;

  return (
    <button
      className={cn(
        {
          [styles.active]: isActive,
        },
        styles.tabTrigger,
      )}
      onClick={() => goToTab(index)}
    >
      {children}
    </button>
  );
}

function TabTiggerList({ children }: PropsWithChildren) {
  return <div className={styles.tabList}>{children}</div>;
}

function TabPanel({ index, children }: TabPanelProps) {
  const tabContext = useContext(TabContext);
  if (!tabContext) return;
  const { activeIndex } = tabContext;

  if (index !== activeIndex) return null;

  return <>{children}</>;
}

export const Tab = Object.assign(Main, {
  TriggerList: TabTiggerList,
  Trigger: TabTrigger,
  Panel: TabPanel,
});
