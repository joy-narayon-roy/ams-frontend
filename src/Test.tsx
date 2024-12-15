import { useEffect } from "react";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext/index";

function TestComponent() {
  const authContext = useAuthContext();

  function dumm() {
    authContext
    .logout()
      // .login({ email: "joyroy3243@gmail.com", password: "123456" })
      // .then((authRes) => {
      //   console.log("Auth", authRes);
      // })
      // .catch((err) => {
        
      //   console.log(err);
      // });
  }

  useEffect(() => {
    dumm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Test Component</h1>
      <button onClick={dumm}>Click</button>
    </>
  );
}

function TestComponent1() {
  const auth = useAuthContext();
  console.log("User TestComponent1", auth.user);
  return <div>TestComponent1</div>;
}

export default function Test() {
  return (
    <>
      <AuthProvider>
        <TestComponent />
        <TestComponent1 />
      </AuthProvider>
    </>
  );
}
