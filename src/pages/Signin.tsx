import { useEffect } from "react";
import "../styles/pages_styles/sign.page.css";

import SigninForm from "../components/SigninForm";
export default function Signin() {
  useEffect(() => {
    document.title = "AMS - Signin";
  }, []);

  return (
    <>
      <main>
        <SigninForm title={"Signin"} />
      </main>
    </>
  );
}
