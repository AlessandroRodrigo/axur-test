import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./button.css";
import { Spinner } from "@/components/spinner";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
  }
>;

export function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <button className="button" {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
