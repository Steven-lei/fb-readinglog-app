import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Show from "./components/Show";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import App from "./App";
import MyComments from "./components/MyComments";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route exact path="/" element={<App />} />

          <Route
            path="/editbook/:bookid"
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createbook"
            element={
              <ProtectedRoute>
                <CreateBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mycomments"
            element={
              <ProtectedRoute>
                <MyComments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/show/:id"
            element={
              <ProtectedRoute>
                <Show />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
