// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components

// import FooterSmall from "components/Footers/FooterSmall.js";

// // views


// import FormateurDashboard from "views/formateur/FormateurDashbord.js";
// export default function Auth() {
//   return (
//     <>
      
//       <main>
//         <section className="relative w-full h-full py-0 min-h-screen">
//           {/* <div
//             className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
//             style={{
//               backgroundImage:
//                 "url(" + require("assets/img/backof14.jpg").default + ")",
//             }}
//           ></div> */}
          
//           <Switch>
          
//           <Route path="/formateur/formateurDashbord" exact component={FormateurDashboard} />

//             <Redirect from="/auth" to="/auth/login" />
//           </Switch>
//           <FooterSmall absolute />
//         </section>
//       </main>
//     </>
//   );
// }
// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components

 //import FooterSmall from "components/Footers/FooterSmall.js";

// // views


// import StudenDashbord from "views/apprenant/StudentDashboard";
// export default function Auth() {
//   return (
//     <>
      
//       <main>
//         <section className="relative w-full h-full py-0 min-h-screen">
//           {/* <div
//             className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
//             style={{
//               backgroundImage:
//                 "url(" + require("assets/img/backof14.jpg").default + ")",
//             }}
//           ></div> */}
          
//           <Switch>
          
//           <Route path="/apprenant/studenDashbord" exact component={StudenDashbord} />

//             <Redirect from="/auth" to="/auth/login" />
//           </Switch>
//           <FooterSmall absolute />
//         </section>
//       </main>
//     </>
//   );
// }
import React from "react";
import { Switch, Redirect } from "react-router-dom";

// components

import SidebarFormateur from "components/Sidebar/SidebarFormateur";
import HeaderStats from "components/Headers/HeaderStats.js";


// views

//import FormateurDashboard from "views/formateur/FormateurDashboard.js";
//import Enregistrement from "views/formateur/Enregistrement.js";
//import FormateurCalendar from "views/formateur/FormateurCalendar.js";
import MainNavbar from "components/Navbars/MainNavbar";
export default function Formateur() {
  return (
    <>
      <div className="relative md:ml-64 bg-blueGray-100">
        <MainNavbar />
        <HeaderStats />
        <SidebarFormateur />
              
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            {/* <Route path="/formateur/formateurDashboard" exact component={FormateurDashboard} />
            <Route path="/formateur/enregistrement" exact component={Enregistrement} />
            <Route path="/formateur/formateurCalendar" exact component={FormateurCalendar} /> */}
            <Redirect from="/formateur" to="/formateur/formateurDashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
