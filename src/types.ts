export type DrawingChain = {
  id: string;
  themeId: string;
  currentPrompt: string;
  drawings: Drawing[];
  createdAt: number;
  isActive: boolean;
};

interface Drawing {
  id: string;
  authorId: string;
  prompt: string;
  imageData: string;
  guesses: Guess[];
  createdAt: number;
}

export type Theme = {
  id: string;
  name: string;
  day: string;
  options: string[];
};

interface Guess {
  userId: string;
  selectedOption: string;
  isCorrect: boolean;
  timestamp: number;
}

interface UserScore {
  userId: string;
  points: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: number;
}
