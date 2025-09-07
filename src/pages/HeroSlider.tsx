// src/components/Home/HeroSlider.tsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// -------------------- Custom Arrows --------------------
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer 
               bg-white/30 hover:bg-white/60 backdrop-blur-xl 
               p-3 md:p-4 rounded-full shadow-xl transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 md:h-6 md:w-6 text-white drop-shadow-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer 
               bg-white/30 hover:bg-white/60 backdrop-blur-xl 
               p-3 md:p-4 rounded-full shadow-xl transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 md:h-6 md:w-6 text-white drop-shadow-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </div>
);

// -------------------- Hero Slider --------------------
const HeroSlider: React.FC = () => {
  const navigate = useNavigate();
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);

  const slides = [
    {
      title: "Your Health, Our Priority",
      text: "Connect with top doctors, manage health records, and book appointments effortlessly.",
      button: "Get Started",
      route: "/register",
      img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=1080",
    },
    {
      title: "Instant Online Booking",
      text: "Schedule consultations with the best specialists anytime, anywhere.",
      button: "Book Now",
      route: "/booking",
      img: "https://images.pexels.com/photos/7578802/pexels-photo-7578802.jpeg?auto=compress&cs=tinysrgb&h=1080",
    },
    {
      title: "Smart Healthcare Dashboards",
      text: "Track health, manage patients, and oversee hospital operations efficiently.",
      button: "Explore Features",
      route: "/features",
      img: "https://images.pexels.com/photos/7579836/pexels-photo-7579836.jpeg?auto=compress&cs=tinysrgb&h=1080",
    },
    {
      title: "Trusted by Specialists Worldwide",
      text: "Highly experienced doctors across multiple specialties at your service.",
      button: "Meet Doctors",
      route: "/doctors",
      img: "https://images.pexels.com/photos/8460046/pexels-photo-8460046.jpeg?auto=compress&cs=tinysrgb&h=1080",
    },
    {
      title: "24/7 Telemedicine",
      text: "Secure video and chat consultations anytime, anywhere.",
      button: "Consult Now",
      route: "/consultation",
      img: "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&h=1080",
    },
    {
      title: "Secure Payments & Records",
      text: "Manage payments and access your medical history in one place.",
      button: "Learn More",
      route: "/payments",
      img: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&h=1080",
    },
  ];

  const mainSettings: Settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const thumbSettings: Settings = {
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <section className="relative overflow-hidden mt-11">
      {/* Main Slider */}
      <Slider
        {...mainSettings}
        asNavFor={nav2 as Slider}
        ref={(slider) => {
          setNav1(slider);
          slider1.current = slider;
        }}
      >
        {slides.map((slide, i) => (
          <div key={i}>
            <div
              className="h-[90vh] bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-blue-900/50 to-teal-800/50"></div>

              {/* Content */}
              <div className="relative z-10 text-center px-6 max-w-3xl mx-auto text-white animate-fadeIn">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl tracking-wide leading-snug">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-10 opacity-95 leading-relaxed">
                  {slide.text}
                </p>
                <button
                  onClick={() => navigate(slide.route)}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 
                             text-white font-semibold px-8 py-3 md:px-10 md:py-4 rounded-full 
                             shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
                >
                  {slide.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Thumbnail Slider */}
      <div className="max-w-4xl mx-auto mt-6 mb-20 px-4">
        <Slider
          {...thumbSettings}
          asNavFor={nav1 as Slider}
          ref={(slider) => {
            setNav2(slider);
            slider2.current = slider;
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="px-2">
              <img
                src={slide.img}
                alt={slide.title}
                className="h-20 w-full object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 transition"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float2"></div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1.2s ease-in-out forwards; }

        @keyframes float1 { 
          0%,100% { transform: translateY(0); } 
          50% { transform: translateY(-30px); } 
        }
        @keyframes float2 { 
          0%,100% { transform: translateY(0); } 
          50% { transform: translateY(25px); } 
        }
        .animate-float1 { animation: float1 7s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default HeroSlider;
