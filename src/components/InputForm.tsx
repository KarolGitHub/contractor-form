import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: 'firstName' | 'lastName' | 'idNumber';
  label: string;
  rules: {};
  register: any;
  errors: { [x: string]: any };
}

const InputForm: React.FC<InputProps> = ({
  name,
  label,
  rules,
  register,
  errors = {},
  ...rest
}) => {
  return (
    <React.Fragment>
      <label className='text-gray-600 font-medium'>{label}</label>
      <input
        className='border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700'
        {...register(name, rules)}
        {...rest}
      />
      {errors[name] && (
        <div className='mb-3 text-normal text-red-500'>
          {errors[name].message}
        </div>
      )}
    </React.Fragment>
  );
};

export default InputForm;
