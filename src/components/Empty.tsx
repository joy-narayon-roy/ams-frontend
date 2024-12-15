import empty from "../images/empty.png";
import style from "../styles/components_styles/empty.module.css";

export default function Empty() {
  return (
    <div className={style["div"]}>
      <img className={style["img"]} src={empty} alt="" />
    </div>
  );
}
