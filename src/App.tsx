import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext/index";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import AlertSection from "./components/AlertSection";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AlertProvider>
            <Header />
            <AlertSection />
            <AppRoutes />
          </AlertProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
