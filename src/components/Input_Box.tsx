import { useState, useRef } from "react";

import styles from "../styles/components_styles/input_box.module.css";

import button_eye from "../images/eye.png";
import button_not_eye from "../images/not_eye.png";

type PropsType = {
  type?: string;
  name?: string;
  placeholder?: string;
  button?: boolean;
  required?: boolean;
  input_value?: string;
  on_input: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data_list?: string;
};

export default function Input_Box({
  type = "text",
  name = "",
  placeholder = "",
  button = false,
  required = false,
  input_value = "",
  on_input,
  data_list,
}: PropsType) {
  const inp = useRef<HTMLInputElement>(null);
  const img = useRef<HTMLImageElement>(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const toggle_password = () => {
    if (inp.current) {
      const currentType = inp.current.getAttribute("type");
      inp.current.setAttribute(
        "type",
        currentType === "password" ? "text" : "password"
      );
    }

    if (img.current) {
      img.current.src = isPasswordVisible ? button_eye : button_not_eye;
    }

    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    event.target.parentElement?.classList.add(styles["invalid"]);
  };

  return (
    <div className={styles["input_box"]}>
      <input
        ref={inp}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={input_value}
        onChange={on_input}
        onInvalid={handleInvalid}
        list={data_list}
      />
      {button && (
        <button onClick={toggle_password} type="button">
          <img ref={img} src={button_eye} alt="Toggle visibility" />
        </button>
      )}
    </div>
  );
}
