import { TextareaHTMLAttributes } from "react";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  label: string;
  className?: string;
}

export const Textarea = ({
  id,
  name,
  label,
  className,
  ...props
}: ITextAreaProps) => {
  return (
    <div className="flex flex-col group focus-within:text-primary">
      <label
        id={`label-${id}`}
        htmlFor={`textarea-${id}`}
        className="mb-1 font-medium group-focus-within:text-primary transition-colors duration-200"
      >
        {label}
      </label>
      <textarea
        id={`textarea-${id}`}
        name={name}
        rows={5}
        className={`resize-none${className ? ` ${className}` : ""}`}
        {...props}
      ></textarea>
    </div>
  );
};
