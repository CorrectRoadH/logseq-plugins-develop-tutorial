import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { logseq as PL } from "../package.json";

// @ts-expect-error
const css = (t, ...args) => String.raw(t, ...args);

const pluginId = PL.id;

function main() {
  console.info(`#${pluginId}: MAIN`);
  const root = ReactDOM.createRoot(document.getElementById("app")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  function createModel() {
    return {
      show() {
        logseq.showMainUI();
      },
    };
  }

  logseq.provideModel(createModel());
  logseq.setMainUIInlineStyle({
    zIndex: 11,
  });

  const openIconName = "template-plugin-open";

  logseq.provideStyle(css`
    .${openIconName} {
      width: 18px;
      height: 18px;
      margin: 2px 0.4em 0 0.4em;
      background-color: grey;
      border-radius: 4px;
      border: 1px solid #eee;
    }
  `);

  logseq.App.registerUIItem("toolbar", {
    key: "show-plugin-open",
    template: `
    <a data-on-click="show">
      <div class="${openIconName}"></div>
    </a>
  `,
  });
}

logseq.ready(main).catch(console.error);
