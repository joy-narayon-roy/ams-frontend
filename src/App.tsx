import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext/index";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";

// function Main() {
//   // const authContest = useAuthContext();
//   // console.log(authContest);
//   return (
//     <h1 className="text-3xl text-center mt-5">Account Management System</h1>
//   );
// }

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <AppRoutes />
          {/* <Main /> */}
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
