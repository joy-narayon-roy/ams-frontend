import { useNavigate } from "react-router-dom";

import OptionInput from "./OptionInput";
import React from "react";

type propsType = {
  account_type: string;
  change_type?: boolean;
  children: React.JSX.Element;
};
export default function Details({
  account_type,
  change_type = true,
  children,
}: propsType) {
  const navigator = useNavigate();
  function handel_input(ev: React.ChangeEvent<HTMLSelectElement>) {
    const path = ev.currentTarget.value.toLowerCase();
    navigator(path);
  }

  return (
    <section className="details">
      {change_type && (
        <OptionInput
          title="Account type :"
          name="account_type"
          onInput={handel_input}
          input_value={account_type}
          datas={["phone", "email"]}
        />
      )}
      {children}
    </section>
  );
}
