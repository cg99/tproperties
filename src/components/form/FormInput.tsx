import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default FormInput;
