import { InputHTMLAttributes } from "react";
import "./input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};

export function Input({ errorMessage, ...props }: InputProps) {
  return (
    <div className="input__wrapper">
      <input
        role="input"
        {...props}
        className={`
        input
        ${errorMessage ? "input--error" : ""}
      `}
      />

      {errorMessage ? (
        <span role="error-message" className="input__error">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
