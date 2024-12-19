import styles from "../styles/components_styles/radio_input.module.css";

type PropsType = {
  input_value?: boolean | null;
  on_input?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Radio_input({
  on_input = () => {},
  input_value = true,
}: PropsType) {
  return (
    <div className={styles["input_container"]}>
      <label className={styles["input_container-label"]}>Active</label>
      <input
        className={styles["input_container-input"]}
        type="checkbox"
        name="active"
        checked={Boolean(input_value)}
        onChange={on_input}
        // defaultChecked={Boolean(input_value)}
      />
    </div>
  );
}
