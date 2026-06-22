import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
}

export const Input = ({ id, label, name, ...props }: IInputProps) => {
  return (
    <div className="flex flex-col group focus-within:text-primary">
      <label
        id={`label-${id}`}
        htmlFor={`input-${id}`}
        className="mb-1 font-medium group-focus-within:text-primary transition-colors duration-200"
      >
        {label}
      </label>
      <input
        id={`input-${id}`}
        name={name}
        className="touch-auto"
        {...props}
      />
    </div>
  );
};
