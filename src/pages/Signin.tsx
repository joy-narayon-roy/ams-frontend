import { useEffect } from "react";
import "../styles/pages_styles/sign.page.css";

import Signin_Form from "../components/Signin_Form";

export default function Signin() {
  useEffect(() => {
    document.title = "AMS - Sign";
  }, []);
  return (
    <>
      <main>
        <Signin_Form title={'Signin'}/>
      </main>
    </>
  );
}
