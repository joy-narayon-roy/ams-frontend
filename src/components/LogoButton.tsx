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
      className={`others_container ${class_name}`}
      disabled={disabled}
      style={{ fontFamily: "Open Sans" }}
      onClick={onClick}
    >
      <img src={logo} alt={alt} className="icon" />
      <div className="text">{text}</div>
    </button>
  );
}
