import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import forget from "views/auth/forget";
import Register from "views/auth/Register.js";
import Questionnaire from "views/auth/Questionnaire.js";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/backof14.jpg").default + ")",
            }}
          ></div>
          <Switch>
          <Route path="/auth/login" exact component={Login} />
          <Route path="/auth/forget" exact component={forget} />
          <Route path="/auth/register" exact component={Register} />
          <Route path="/questionnaire" exact component={Questionnaire} />

            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
