import style from '../styles/components_styles/logo_button.module.css';
type propsType = {
  type: "button" | "reset" | "submit";
  alt?: string;
  logo: string;
  text?: string;
  class_name: string;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
};

export default function LogoButton({
  type = "button",
  alt = "Logo",
  logo,
  text = "Button",
  class_name,
  disabled = false,
  onClick,
}: propsType) {
  return (
    <button
      type={type}
      className={`${style.others_container} ${style[class_name]}`}
      disabled={disabled}
      style={{ fontFamily: "Open Sans" }}
      onClick={onClick}
    >
      <img src={logo} alt={alt} className={style.icon} />
      <div className={style.text}>{text}</div>
    </button>
  );
}
