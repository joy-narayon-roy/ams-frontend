/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../styles/components_styles/vertial_card.module.css";
import useIcone from "../hooks/useIcone";

import { Email, Phone } from "../models";

type propsType = {
  data: Email | Phone;
  on_click: ({
    data,
    provider,
  }: {
    data: Email | Phone;
    provider: object;
  }) => unknown;
};
export default function Vertical_card({
  data,
  on_click = () => {},
}: propsType) {
  if (!data) {
    return <></>;
  }

  const provider = useIcone(data);
  const { src } = provider;
  let title = "";

  if (data instanceof Phone) {
    title = data.number;
  } else if (data instanceof Email) {
    title = data.address;
  }

  return (
    <div
      onClick={() => on_click({ data, provider })}
      className={styles["vertical_card"]}
    >
      <div className={styles["vertical_card-icon"]}>
        <img src={src ? src : ""} alt="" />
      </div>
      <div className={styles["vertical_card-text"]}>{title}</div>
    </div>
  );
}
