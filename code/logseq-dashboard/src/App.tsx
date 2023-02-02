import React, { useRef } from "react";
import { useAppVisible } from "./utils";
import { Dashboard } from "./dashboard";

function App() {
  const innerRef = useRef<HTMLDivElement>(null);
  const visible = useAppVisible();

  if (visible) {
    return (
      <main
          className="fixed inset-0 flex items-center justify-center"
          onClick={(e) => {
            if (!innerRef.current?.contains(e.target as any)) {
              window.logseq.hideMainUI();
            }
          }}
        >
        <Dashboard ref={innerRef}  />
      </main>
    );
  }
  return null;
}

export default App;