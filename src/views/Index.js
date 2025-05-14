/*eslint-disable*/
import React from "react";
import { Link,useHistory } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {

  const history = useHistory();
  //const [navbarOpen, setNavbarOpen] = React.useState(false);

  const goToLogin = () => {
    history.push('/auth/login'); // navigate to login
  };
  return (
    <>
      <IndexNavbar fixed />
<section className="header relative pt-16 items-center flex h-screen max-h-860-px">
  {/* Background Image */}
  <div className="absolute top-0 w-full h-full bg-center bg-cover"
    style={{
      backgroundImage: "url(" + require("assets/img/bbbback.jpg").default + ")",
    }}>
    {/* Dark Overlay */}
    <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
  </div>

  {/* Text Content */}
  <div className="relative z-10 container mx-auto items-center flex flex-wrap">
    <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
      
    </div>
  </div>
</section>

      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        {/*  */}
      </section>
      <Footer />
    </>
  );
}
