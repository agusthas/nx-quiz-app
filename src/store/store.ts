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
        clearAnswers: () => set({ answers: [] }),

        result: {
          answered: 0,
          correct: 0,
          incorrect: 0,
          score: 0,
        },
        setResult: (result) => set({ result }),
        clearResult: () =>
          set({
            result: {
              answered: 0,
              correct: 0,
              incorrect: 0,
            },
          }),

        clearAppState: () => {
          get().clearQuestionSet();
          get().clearResult();
          get().clearAnswers();
        },
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          user: state.user,
          questionSet: state.questionSet,
          answers: state.answers,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
);

export default useAppStore;
