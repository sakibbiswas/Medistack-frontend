// // src/pages/Landing.tsx
// import React from "react";
// import HeroSlider from "./HeroSlider";
// import Features from "./Features";
// import Meet from "./Meet";
// import FAQ from "./FAQsection";
// import Sidebar from "../components/Sidebar";
// import { getUser } from "../utils/auth";
// import Contact from "./Contact";
// import Footer from "./Footer";

// const Landing: React.FC = () => {
//   const user = getUser();

//   return (
//     <div className="bg-gray-50 relative">
//       {/* Sidebar (only if logged in) */}
//       {user && <Sidebar />}

//       {/* Main Content */}
//       <main className={user ? "ml-64" : ""}>
//         {/* Hero Section */}
//         <section className="relative">
//           <HeroSlider />
//         </section>

//         {/* Features Section */}
//         <section className="-mt-16 relative z-10">
//           <Features />
//         </section>

//         {/* Meet Section */}
//         <section className="-mt-16 relative z-10">
//           <Meet />
//         </section>

//         {/* FAQ Section */}
//         <section className="-mt-16 relative z-10">
//           <FAQ />
//         </section>

//         {/* Contact  */}

//     <Contact></Contact>

//  {/* Footer  */}
//       <Footer></Footer>
//       </main>
//     </div>
//   );
// };

// export default Landing;




















//Responsive for mobile and pc 
// src/pages/Landing.tsx
import React from "react";
import HeroSlider from "./HeroSlider";
import Features from "./Features";
import Meet from "./Meet";
import FAQ from "./FAQsection";
import Sidebar from "../components/Sidebar";
import { getUser } from "../utils/auth";
import Contact from "./Contact";
import Footer from "./Footer";

const Landing: React.FC = () => {
  const user = getUser();

  return (
    <div className="bg-gray-50 relative min-h-screen">
      {/* Sidebar (only if logged in) */}
      {user && <Sidebar />}

      {/* Main Content */}
      <main className={user ? "md:ml-64" : ""}> {/* ✅ only push content on desktop */}
        {/* Hero Section */}
        <section className="relative">
          <HeroSlider />
        </section>

        {/* Features Section */}
        <section className="-mt-16 relative z-10">
          <Features />
        </section>

        {/* Meet Section */}
        <section className="-mt-16 relative z-10">
          <Meet />
        </section>

        {/* FAQ Section */}
        <section className="-mt-16 relative z-10">
          <FAQ />
        </section>

        {/* Contact Section */}
        <section className="-mt-16 relative z-10">
          <Contact />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Landing;
