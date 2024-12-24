import { AuthProvider, useAuthContext } from "./contexts/AuthContext";

function Logout() {
  const { logout } = useAuthContext();
  function logoutFunc() {
    logout()
      .then((status) => {
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <button onClick={logoutFunc}>Logout</button>
    </>
  );
}

function LoginComp() {
  const { loginWithEmailPassword } = useAuthContext();
  function login() {
    loginWithEmailPassword({
      email: "joyroy3243@gmail.com",
      password: "pass123",
    })
      .then((status) => {
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <button onClick={login}>Login</button>
    </>
  );
}

function HomeComp() {
  const { user } = useAuthContext();
  async function loadToken() {
    if (user) {
      user.getIdToken().then((tkn) => {
        console.log(tkn);
        navigator.clipboard.writeText(tkn);
      });
    }
  }
  return (
    <>
      <div className="">Component 1</div>
      <button className="btn_pri" onClick={loadToken}>
        Generate Token
      </button>
      <br />

      <Logout />
    </>
  );
}

function ComRouter() {
  const { user } = useAuthContext();

  // if (user) {
  //   console.log(user.refreshToken);
  //   user.getIdToken().then((token) => {
  //     console.log(token);
  //   });
  // }

  if (user) {
    return <HomeComp />;
  } else {
    return <LoginComp />;
  }
}
export default function Test() {
  return (
    <AuthProvider>
      <div className="max-w-lg bg-white border-2 border-gray-600 rounded-md mx-auto p-3">
        <h1 className="text-center text-2xl">Test APP</h1>
        <ComRouter />
      </div>
    </AuthProvider>
  );
}
