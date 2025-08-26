import React from 'react';

const InputField = ({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  name,
  required,
  style,
  ...props 
}) => (
  <div style={{ marginBottom: '16px', width: '100%', ...style }}>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s',
        '&:focus': {
          borderColor: '#007bff'
        }
      }}
      {...props}
    />
  </div>
);

export default InputField;