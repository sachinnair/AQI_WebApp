import "./NavItem.css";
import React, { useEffect, useState } from "react";

export default function NavItem({ href, forcedReset, children }) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, [forcedReset]);

  return (
    <li>
      <a
        href={href}
        className={`nav-item ${
          isClicked ? "nav-item--clicked" : "nav-item--reset"
        }`}
        onClick={() => setIsClicked(true)}
      >
        {children}
      </a>
    </li>
  );
}
