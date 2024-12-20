import Input_Box from "./Input_Box";
import styles from "../styles/components_styles/input_container.module.css";

type InputContainerProps = {
  title?: string;
  input_type?: string;
  input_placeholder?: string;
  input_name?: string;
  input_autoComplete?: string;
  input_required?: boolean;
  input_value?: string;
  on_input: (event: React.ChangeEvent<HTMLInputElement>) => void;
  button?: boolean;
  data_list?: boolean;
  input_reqired?: boolean;
  dataOptions?: { value: string }[];
};

export default function Input_container({
  title = "Set It",
  input_type = "text",
  input_placeholder = "",
  input_name = "",
  // input_autoComplete = "",
  input_required = false,
  input_value = "",
  on_input,
  button = false,
  data_list = false,
  dataOptions = [],
}: InputContainerProps) {
  return (
    <div className={styles.input_container}>
      <label>{title}</label>
      <Input_Box
        type={input_type}
        name={input_name}
        placeholder={input_placeholder}
        input_value={input_value}
        on_input={on_input}
        button={button}
        input_required={input_required}
        data_list={data_list ? "dl" : ""}
      />
      {data_list && dataOptions.length > 0 && (
        <datalist id="dl">
          {dataOptions.map((data, index) => (
            <option key={index} value={data.value}>
              {data.value}
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
}
