import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import ForgotPassword from "views/auth/ForgotPassword";
import ResetPassword from "views/auth/ResetPassword";
import Register from "views/auth/Register.js";
export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-100 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/seConnecter.png").default + ")",
            }}
          >
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

          </div>
          <Switch>
          <Route path="/auth/login" exact component={Login} />
          <Route path="/auth/forgotPassword" exact component={ForgotPassword} />
          <Route path="/auth/resetPassword" exact component={ResetPassword} />
          <Route path="/auth/register" exact component={Register} />

            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
