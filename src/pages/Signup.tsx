import { useEffect } from "react";
import SigninForm from "../components/SigninForm";

import '../styles/pages_styles/signin.page.css';

export default function Signin() {
  useEffect(() => {
    document.title = "AMS - Signup";
  }, []);

  return (
    <>
      <main className="signin_main">
        <SigninForm title={"Signup"} mode="signup" />
      </main>
    </>
  );
}
