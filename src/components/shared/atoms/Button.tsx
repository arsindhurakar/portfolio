import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  children: ReactNode;
}

export const Button = ({
  id,
  type = "button",
  loading,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button id={`button-${id}`} type={type} {...props}>
      <div className="flex gap-1">
        {children}
        {loading && (
          <span className="flex gap-0.5">
            {loading && <span className="loading-ellipsis " />}
          </span>
        )}
      </div>
    </button>
  );
};
