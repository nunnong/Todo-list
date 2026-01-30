export type ButtonType = "add" | "delete" | "edit";
export type ButtonSize = "large" | "small";
export type ButtonState = "default" | "active";

export interface ButtonProps {
  type: ButtonType;
  size?: ButtonSize;
  state?: ButtonState;
  onClick?: () => void;
}
