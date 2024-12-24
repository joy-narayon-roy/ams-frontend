import { useState, useRef, useEffect } from "react";

import styles from "../styles/components_styles/input_box.module.css";

import button_eye from "../images/eye.png";
import button_not_eye from "../images/not_eye.png";

type PropsType = {
  type?: string;
  name?: string;
  placeholder?: string;
  button?: boolean;
  input_value?: string;
  input_minlength?: number | undefined;
  on_input: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data_list?: string;
  input_required?: boolean;
};

export default function Input_Box({
  type = "text",
  name = "",
  placeholder = "",
  button = false,
  input_value = "",
  on_input,
  input_required = false,
  data_list,
  input_minlength = undefined,
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

    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    event.target.parentElement?.classList.add(styles["invalid"]);
  };

  useEffect(() => {
    if (isPasswordVisible) {
      setTimeout(() => {
        setIsPasswordVisible(false);
      }, 3000);
    }
  }, [isPasswordVisible]);

  return (
    <div className={styles["input_box"]}>
      <input
        ref={inp}
        type={isPasswordVisible ? "text" : type}
        name={name}
        placeholder={placeholder}
        required={input_required}
        value={input_value}
        onChange={on_input}
        onInvalid={handleInvalid}
        list={data_list}
        minLength={input_minlength}
      />
      {button && (
        <button onClick={toggle_password} type="button">
          <img
            ref={img}
            src={isPasswordVisible ? button_not_eye : button_eye}
            alt="Toggle visibility"
          />
        </button>
      )}
    </div>
  );
}
