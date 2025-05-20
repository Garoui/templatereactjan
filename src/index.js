import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Formateur from "layouts/Formateur.js"
// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import SessionModal from "views/SessionModal";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!Cookies.get("jwt_token_abir");
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/formateur" component={Formateur} />

      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
            <Route path="/profile" exact component={Profile} />
      <Route path="/sessionModal" exact component={SessionModal} />

      <Route path="/" exact component={Index} />
      {/* Protected routes */}
      <PrivateRoute path="/profile" exact component={Profile} />
      
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
      
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);




// const ProtectedRoute = ({ children }) => {
//   const token = Cookies.get('jwt_token_abir');
//   // Vérifie aussi si le token est expiré
//   if (!token) {
//     return <Navigate to="/auth/login" replace />;
//   }
//   try {
//     const decoded = jwtDecode(token);
//     if (decoded.exp < Date.now() / 1000) {
//       return <Navigate to="/auth/login" replace />;
//     }
//     return children;
//   } catch {
//     return <Navigate to="/auth/login" replace />;
//   }
// };

// ReactDOM.render(
//   <BrowserRouter>
//     <Routes>
//       {/* Routes avec layouts */}
//       <Route path="/admin/*" element={<Admin />} />
//       <Route path="/auth/*" element={<Auth />} />
      
//       {/* Routes publiques sans layout */}
//       <Route path="/landing" element={<Landing />} />
//       <Route path="/" element={<Index />} />
      
//       {/* Route protégée */}
//       <Route 
//         path="/profile" 
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         } 
//       />
      
//       {/* Redirection pour les routes inconnues */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   </BrowserRouter>,
//   document.getElementById("root")
// );