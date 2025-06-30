// src/Components/HeadingPanel.tsx
import React from 'react';
import './HeadingPanel.css';

// ==============================
// 📢 HeadingPanel Props Interface
// ==============================
interface HeadingPanelProps {
  subheading: string;
  heading: string;
}

// ==============================
// 🧩 HeadingPanel Component
// ==============================
const HeadingPanel: React.FC<HeadingPanelProps> = ({ subheading, heading }) => {
  return (
    <div className="heading-panel">
      <h2>{subheading}</h2>
      <h1>{heading}</h1>
    </div>
  );
};

export default HeadingPanel;
