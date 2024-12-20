import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputContainer from "./InputContainer";
import Button from "./Button";
// import Logo_button from "./Logo_button";

import { useAuthContext } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";

export default function Signin_Form({ title }: { title: string }) {
  const authContext = useAuthContext();
  const { addAlert } = useAlert();

  const [button_disabled, setButton_disabled] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const on_change_handeler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [ev.target.name]: ev.target.value,
    });
  };

  const form_submit_handeler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButton_disabled(true);
    authContext
      .login({
        ...userInfo,
      })
      .then(() => {
        addAlert("success", "Successfuly login!");
      })
      .catch((err) => {
        setButton_disabled(false);
        addAlert("failed", err.message);
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={form_submit_handeler}
      className="login_form max-w-sm"
      action=""
    >
      <div className="login_form-title">
        <h2>{title}</h2>
      </div>

      <div className="line"></div>

      <div className="login_form-inputs">
        <InputContainer
          title="Enter Email"
          input_name="email"
          input_placeholder="Enter your email"
          input_type="email"
          input_required
          on_input={on_change_handeler}
          input_value={userInfo.email}
        />

        <InputContainer
          title="Enter Password"
          input_name="password"
          input_placeholder="Enter your password"
          input_type="password"
          input_required
          input_value={userInfo.password}
          on_input={on_change_handeler}
        />

        <Button type="submit" disabled={button_disabled} text={"Login"} />
        <Link style={{ display: "block", textAlign: "center" }} to={"/signup"}>
          Create Account
        </Link>
      </div>

      <div className="line"></div>

      <div className="others">
        {/* <Logo_button
          onClick={singin_with_google}
          type="button"
          disabled
          alt="logo"
          logo="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          text="Signin With Google"
          class_name="google"
        />
        <Logo_button
          onClick={signin_with_facebook}
          type="button"
          alt="logo"
          logo="https://www.pngguru.in/storage/uploads/images/Facebook%20Social%20Media%20icon%20stock%20png_1657957454_2044339521.webp"
          text="Signin With Facebook"
          class_name="facebook"
          disabled
        /> */}
      </div>
    </form>
  );
}
