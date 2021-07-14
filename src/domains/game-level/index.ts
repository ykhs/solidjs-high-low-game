export type GameLevel = {
  choices: number[];
  answer: number;
};

const range = (start: number, end: number): number[] => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

export const createRandomAnswer = (size: number) => {
  return Math.floor(Math.random() * size + 1);
};

export const createNewLevel = (size = 10): GameLevel => {
  return {
    choices: range(1, size),
    answer: createRandomAnswer(size),
  };
};
