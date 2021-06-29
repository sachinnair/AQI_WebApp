import { useState } from "react";

export default function Nav({ children }) {
  const [forceReset, setForcefulReset] = useState(true);

  function resetClickState() {
    setForcefulReset((oldState) => !oldState);
  }

  return (
    <nav className="p-4 shadow-lg">
      <ul
        className="flex bg-amber-100 shadow-inner"
        onClickCapture={resetClickState}
      >
        {children.map((x) => {
          return { ...x, props: { ...x.props, forcedReset: !forceReset } };
        })}
      </ul>
    </nav>
  );
}
