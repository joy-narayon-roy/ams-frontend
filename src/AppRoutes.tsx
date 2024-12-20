import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuthContext } from "./contexts/AuthContext";
import { User } from "./models";

import {
  Deshboard,
  Details,
  Signin,
  CreateAccount,
  PgaeNotfound,
  PgaeServerError,
} from "./pages";
import Test from "./Test";

import {
  PhoneTable,
  EmailTable,
  NotFound,
} from "./components/details_table_component";

import { CreateEmail, CreatePhone } from "./components/create_accounts_forms";
import { UpdateEmail, UpdatePhone } from "./components/update_accounts_forms";

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
            <CreateAccount />
          </UserProtected>
        }
      >
        <Route index element={<Navigate to={"/create/phone"} />} />
        <Route path="phone" element={<CreatePhone data={null} />} />
        <Route path="email" element={<CreateEmail data={null} />} />
        <Route path="*" element={<NotFound />} />
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

      <Route path="/error" element={<PgaeServerError />} />
      {import.meta.env.MODE == "development" && (
        <Route path="/test" element={<Test />} />
      )}
      <Route path="*" element={<PgaeNotfound />} />
    </Routes>
  );
}

export default AppRoutes;
