import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        className={`
          px-3 py-2 rounded-md border shadow-sm
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
          w-full
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextArea;