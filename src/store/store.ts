import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState } from './types';
import { OpenTDBQuestionResponse } from 'src/types';
import { createQuestionSet } from 'src/utils/createQuestionSet';

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        login: (email, password) => {
          set({ user: { email, password } });
        },
        logout: () => {
          set({ user: undefined });
        },
        isLoading: false,
        setQuestionSet: async (url: string) => {
          set({ isLoading: true });
          try {
            const response = await fetch(url);
            const data = (await response.json()) as OpenTDBQuestionResponse;
            const questionSet = createQuestionSet(data);
            set({ questionSet, isLoading: false });
          } catch (error) {
            set({ isLoading: false });
            throw new Error('Failed to set question set');
          }
        },
        clearQuestionSet: () => set({ questionSet: undefined }),

        answers: [],
        pushAnswer: (questionNumber, answer) => {
          const answers = [...get().answers];
          answers[questionNumber] = answer;
          set({ answers });
        },
      }),
      {
        name: 'app-storage',
      }
    ),
    {
      name: 'app-store',
    }
  )
);

export default useAppStore;
