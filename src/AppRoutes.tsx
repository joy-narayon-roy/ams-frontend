import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuthContext } from "./contexts/AuthContext";
import { User } from "./models";

import {
  //   CreateAccount,
  Deshboard,
  Details,
  Signin,
  //   Signout,
  //   Signup,
  //   Update_profile,
  //   UpdateDetails,
} from "./pages";
import Page500 from "./pages/Pgae500";
import Page404 from "./pages/Pgae404";

import {
  PhoneTable,
  EmailTable,
  NotFound,
} from "./components/details_table_component";

import { UpdateEmail, UpdatePhone } from "./components/update_accounts_forms";

// import {
//   Create_app_account,
//   Create_email,
//   Create_facebook,
//   Create_phone,
//   Create_web_account,
// } from "./components/create_accounts_forms";

// import { Update_email, Update_phone } from "./components/update_accounts_forms";
// import { Phone_table, Email_table } from "./components/details_table_component";

function NotLogedin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <Loading />;
  }
  return user && user instanceof User ? <Navigate to={"/"} /> : children;
}

function UserProtected({ children }: { children: React.ReactNode }) {
  const { user, loading, error } = useAuthContext();
  if (!user && loading && !error) {
    return <Loading />;
  } else if (!user && !loading && error) {
    return <Navigate to={"/failed"} state={error} />;
  } else if (!user && !loading && !error) {
    return <Navigate to={"/signin"} />;
  } else {
    return children;
  }
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <UserProtected>
            <Deshboard />
          </UserProtected>
        }
      />

      <Route
        path="/create"
        element={
          <UserProtected>
            <div>{/* <CreateAccount /> */}Create</div>
          </UserProtected>
        }
      >
        {/* <Route index element={<div><Create_phone /></div>} />
        <Route path="phone" element={<Create_phone />} />
        <Route path="email" element={<Create_email />} />
        <Route path="facebook" element={<Create_facebook />} />
        <Route path="web" element={<Create_web_account />} />
        <Route path="app" element={<Create_app_account />} />
        <Route path="*" element={<Navigate to={"phone"} />} /> */}
      </Route>

      <Route
        path="/details"
        element={
          <UserProtected>
            <Details editMode={false} />
          </UserProtected>
        }
      >
        <Route index element={<NotFound />} />
        <Route path="phone/:id" element={<PhoneTable />} />
        <Route path="email/:id" element={<EmailTable />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/update"
        element={
          <UserProtected>
            <Details editMode={true} />
          </UserProtected>
        }
      >
        <Route index element={<NotFound />} />
        <Route path="phone/:id" element={<UpdatePhone />} />
        <Route path="email/:id" element={<UpdateEmail />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/signin"
        element={
          <NotLogedin>
            <Signin />
          </NotLogedin>
        }
      />

      <Route path="/error" element={<Page500 />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AppRoutes;
