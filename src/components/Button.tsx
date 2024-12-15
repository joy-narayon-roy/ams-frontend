import React from "react";
import styles from "../styles/components_styles/button.module.css";

interface ButtonPropsInter {
  text?: string;
  class_name?: string;
  type?: "button" | "submit" | "reset";
  on_click?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function Button({
  text = "Btn",
  class_name = "btn_pri",
  type = "button",
  on_click = () => {},
  disabled = false,
}: ButtonPropsInter) {
  return (
    <button
      onClick={on_click}
      className={styles[class_name]}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
