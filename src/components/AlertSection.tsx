import { Fragment } from "react/jsx-runtime";
import { useAlert } from "../contexts/AlertContext";
import style from "../styles/components_styles/alertSection.module.css";
import titleConverter from "../utilities/titleConverter";

type AlertProps = {
  type: string;
  message: string;
  onClose?: () => void;
};
export function Alert({ type, message, onClose = () => {} }: AlertProps) {
  return (
    <div className={`${style["alert-popup"]} ${style[type]}`}>
      <span>{titleConverter(message)}</span>
      <span onClick={onClose}>X</span>
    </div>
  );
}

export default function AlertSection() {
  const { alerts, removeAlert } = useAlert();
  function handelCloseAlert(id: string) {
    removeAlert(id);
  }
  return (
    <section className={style["alert-section"]}>
      {/* <Alert message={"alert.message"} type="success" /> */}
      {alerts.map((alert) => (
        <Fragment key={alert.id}>
          <Alert
            message={alert.message}
            onClose={() => handelCloseAlert(alert.id)}
            type={alert.type}
          />
        </Fragment>
      ))}
    </section>
  );
}
