import { useEffect } from "react";
import SigninForm from "../components/SigninForm";

import '../styles/pages_styles/signin.page.css';

export default function Signin() {
  useEffect(() => {
    document.title = "AMS - Signin";
  }, []);

  return (
    <>
      <main className="signin_main" >
        <SigninForm title={"Signin"} />
      </main>
    </>
  );
}
