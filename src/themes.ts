import { Theme } from "../src/types.js";

export const WEEKLY_THEMES: Record<string, Theme> = {
  MONDAY: {
    id: "movies-monday",
    name: "Movies Monday",
    day: "mon",
    options: [
      "Star Wars",
      "The Matrix",
      "Jurassic Park",
      "Harry Potter",
      "The Lion King",
      "Titanic",
    ],
  },
  TUESDAY: {
    id: "tech-tuesday",
    name: "Tech Tuesday",
    day: "tue",
    options: [
      "iPhone",
      "Robot",
      "Social Media",
      "Virtual Reality",
      "Artificial Intelligence",
      "Video Games",
    ],
  },
  WEDNESDAY: {
    id: "wildlife-wednesday",
    name: "Wildlife Wednesday",
    day: "wed",
    options: ["Lion", "Penguin", "Elephant", "Dolphin", "Giraffe", "Panda"],
  },
  THURSDAY: {
    id: "sports-thursday",
    name: "Sports Thursday",
    day: "thr",
    options: [
      "Soccer",
      "Basketball",
      "Tennis",
      "Baseball",
      "Swimming",
      "Football",
    ],
  },
  FRIDAY: {
    id: "food-friday",
    name: "Food Friday",
    day: "fri",
    options: ["Pizza", "Sushi", "Burger", "Ice Cream", "Tacos", "Pasta"],
  },
  WEEKEND: {
    id: "special-weekend",
    name: "Special Weekend",
    day: "sat,sun",
    options: ["Music", "Space", "Fantasy", "Nature", "Architecture", "Art"],
  },
};

export function getCurrentTheme(): Theme {
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase()
    .substring(0, 3);

  // Handle weekend case
  if (today === "sat" || today === "sun") {
    return WEEKLY_THEMES.WEEKEND;
  }

  // For weekdays
  return (
    Object.values(WEEKLY_THEMES).find((theme) => theme.day === today) ||
    WEEKLY_THEMES.MONDAY
  );
}
