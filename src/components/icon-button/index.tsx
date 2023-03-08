import { HTMLAttributes } from "react";
import "./icon-button.css";

type IconButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function IconButton({ icon, onClick, ...props }: IconButtonProps) {
  return (
    <div
      role="icon-button"
      {...props}
      className="icon-button__wrapper"
      onClick={onClick}
    >
      {icon}
    </div>
  );
}
