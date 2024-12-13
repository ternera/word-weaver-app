import { Devvit } from "@devvit/public-api";
import { getCurrentTheme } from "./themes.js";

// Configure Devvit's plugins
Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Adds a new menu item to the subreddit allowing to create a new post
Devvit.addMenuItem({
  label: "Create New Devvit Post (with Web View)",
  location: "subreddit",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const currentTheme = getCurrentTheme();

    const post = await reddit.submitPost({
      title: `WordWeaver: ${currentTheme.name}`,
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading SketchStory...</text>
        </vstack>
      ),
    });

    ui.showToast({ text: "Created new drawing chain!" });
    ui.navigateTo(post);
  },
});
