import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LOCAL_STORAGE_KEY } from '../constants/storageKey';

interface UserState {
  nickname: string;
  profileImage: string;
}

interface UserAction {
  update: (user: UserState) => void;
  clear: () => void;
}

interface UserStore extends UserState, UserAction {}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      nickname: '',
      profileImage: '',
      update: ({ nickname, profileImage }) => set({ nickname, profileImage }),
      clear: () => set({ nickname: '', profileImage: '' }), // 상태 초기화
    }),
    {
      name: LOCAL_STORAGE_KEY.USER_STORAGE, // 로컬 스토리지 키
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
