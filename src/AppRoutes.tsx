import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuthContext } from "./contexts/AuthContext";
import { User } from "./models";

import {
  //   CreateAccount,
  Deshboard,
  Details,
  //   Not_found,
  //   Server_faild,
  Signin,
  //   Signout,
  //   Signup,
  //   Update_profile,
  //   UpdateDetails,
} from "./pages";

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
            <div>{/* <CreateAccount /> */}</div>
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
            <Details />
          </UserProtected>
        }
      >
        {/* <Route index element={<div><Create_phone /></div>} /> */}
        <Route path="phone/:id" element={<div>Phone</div>} />
        <Route path="email/:id" element={<div>Details_email</div>} />
        {/* 
        <Route path="facebook" element={<Create_facebook />} />
        <Route path="web" element={<Create_web_account />} />
        <Route path="app" element={<Create_app_account />} /> */}
        <Route path="*" element={<div>Othets</div>} />
      </Route>

      <Route
        path="/signin"
        element={
          <NotLogedin>
            <Signin />
          </NotLogedin>
        }
      />

      {/* <Route path="/updateprofile" element={<Update_profile />} /> */}

      {/* <Route
        path="/update"
        element={
          <UserProtected>
            <UpdateDetails />
          </UserProtected>
        }
      >
        <Route index element={<Update_phone />} />
        <Route path="phone" element={<Update_phone />} />
        <Route path="email" element={<Update_email />} />
      </Route>

      <Route
        path="/details"
        element={
          <UserProtected>
            <Details_page />
          </UserProtected>
        }
      >
        <Route index element={<Phone_table />} />
        <Route path="phone" element={<Phone_table />} />
        <Route path="email" element={<Email_table />} />
      </Route>
    <Route
        path="/signout"
        element={
          <UserProtected>
            <Signout />
          </UserProtected>
        }
      />

      <Route path="/signup" element={<Signup />} />

      <Route path="/failed" element={<Server_faild />} />
      <Route path="/404" element={<Not_found />} />
      <Route path="*" element={<Not_found />} /> */}
    </Routes>
  );
}

export default AppRoutes;
