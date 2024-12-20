import style from "../styles/components_styles/input_container.module.css";
import inp_box from "../styles/components_styles/option_input.module.css";
import titleConverter from "../utilities/titleConverter";

type propsType = {
  title?: string;
  name?: string;
  input_value: string;
  onInput?: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  datas?: string[];
};
export default function OptionInput({
  title = "",
  name = "",
  input_value,
  onInput = () => {},
  datas = [],
}: propsType) {
  return (
    <div className={style["input_container"]}>
      <label>{title}</label>
      <div className={inp_box["input_box"]}>
        <select name={name} value={input_value} onChange={onInput}>
          {datas.map((data, ind) => {
            return (
              <option key={ind} value={data}>
                {/* {data.replace(data[0], data[0].toUpperCase())} */}
                {titleConverter(data)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
