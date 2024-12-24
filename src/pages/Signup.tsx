import { useEffect } from "react";
import "../styles/pages_styles/sign.page.css";

import SigninForm from "../components/SigninForm";
export default function Signin() {
  useEffect(() => {
    document.title = "AMS - Signup";
  }, []);

  return (
    <>
      <main>
        <SigninForm title={"Signup"} mode="signup" />
      </main>
    </>
  );
}
