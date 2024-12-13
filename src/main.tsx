import "./createPost.js";

import { Devvit, useState } from "@devvit/public-api";
import { getCurrentTheme } from "./themes.js";
import { getActiveChains } from "./storage.js";

// Defines the messages that are exchanged between Devvit and Web View
type WebViewMessage =
  | {
      type: "initialData";
      data: {
        username: string;
        currentTheme: string;
        activeChain?: string;
        options: string[];
      };
    }
  | {
      type: "submitDrawing";
      data: {
        imageData: string;
        selectionOption: string;
      };
    }
  | {
      type: "submitGuess";
      data: {
        guess: string;
        chainId: string;
      };
    };

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: "WordWeaver",
  height: "tall",
  render: (context) => {
    const [username] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.username ?? "anon";
    });
    // get current theme
    const [theme] = useState(() => getCurrentTheme());

    // get active chain
    const [activeChain] = useState(async () => {
      return await getActiveChains(context);
    });

    // visibility state for webview
    const [webviewVisible, setWebviewVisible] = useState(false);

    const onMessage = async (msg: WebViewMessage) => {
      switch (msg.type) {
        case "submitDrawing":
          // TODO: Implement drawing submission
          break;
        case "submitGuess":
          // TODO: Implement guess submission
          break;
        default:
          throw new Error(`Unknown message type: ${msg.type}`);
      }
    };
    return (
      <vstack grow padding="small">
        <text size="xlarge" weight="bold">
          {theme.name}
        </text>
        <text size="medium">Welcome {username}! Ready to draw?</text>
        <button onPress={() => setWebviewVisible(true)}>Start Drawing</button>

        {webviewVisible && (
          <webview
            id="drawingCanvas"
            url="page.html"
            onMessage={(msg) => onMessage(msg as WebViewMessage)}
            grow
          />
        )}
      </vstack>
    );
  },
});

export default Devvit;
