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
import { Switch, Route, Redirect } from "react-router-dom";

// components

import SidebarApprenant from "components/Sidebar/SidebarApprenant";
import HeaderStats from "components/Headers/HeaderStats.js";


// views

import Dashboard from "views/apprenant/Dashboard.js";
import Courses from "views/apprenant/Courses.js";
import Calendar from "views/apprenant/Calendar.js";
import MainNavbar from "components/Navbars/MainNavbar";
export default function Admin() {
  return (
    <>
      <div className="relative md:ml-64 bg-blueGray-100">
        <MainNavbar />
        <HeaderStats />
        <SidebarApprenant />
              
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/apprenant/dashboard" exact component={Dashboard} />
            <Route path="/apprenant/courses" exact component={Courses} />
            <Route path="/apprenant/calendar" exact component={Calendar} />
            <Redirect from="/apprenant" to="/apprenant/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
