import React from 'react';

const AppIcon = ({ width = 50, height = 50, color = 'blue' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <rect x="8" y="8" width="8" height="8" fill="white" />
    </svg>
  );
};

export default AppIcon;
