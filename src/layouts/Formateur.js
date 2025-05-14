import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import FooterSmall from "components/Footers/FooterSmall.js";

// views


import FormateurDashboard from "views/formateur/FormateurDashbord.js";
export default function Auth() {
  return (
    <>
      
      <main>
        <section className="relative w-full h-full py-0 min-h-screen">
          {/* <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/backof14.jpg").default + ")",
            }}
          ></div> */}
          
          <Switch>
          
          <Route path="/formateur/formateurDashbord" exact component={FormateurDashboard} />

            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
