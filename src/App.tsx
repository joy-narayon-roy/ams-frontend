import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext/index";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
