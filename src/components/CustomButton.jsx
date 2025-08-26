import React from 'react';

const CustomButton = ({ text, onClick, style }) => (
  <button
    className="custom-button"
    onClick={onClick}
    style={{
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      ...style
    }}
  >
    {text}
  </button>
);

export default CustomButton;