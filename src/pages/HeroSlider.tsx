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
    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer 
               bg-white/30 hover:bg-white/60 backdrop-blur-xl 
               p-2 sm:p-4 rounded-full shadow-xl transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 sm:h-6 sm:w-6 text-white drop-shadow-lg"
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
    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer 
               bg-white/30 hover:bg-white/60 backdrop-blur-xl 
               p-2 sm:p-4 rounded-full shadow-xl transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 sm:h-6 sm:w-6 text-white drop-shadow-lg"
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
      img: "https://mms.businesswire.com/media/20210111005444/en/851257/5/1280_HealthyU_01_final_10.01.2021.jpg",
    },
    {
      title: "Instant Online Booking",
      text: "Schedule consultations with the best specialists anytime, anywhere.",
      button: "Book Now",
      route: "/booking",
      img: "https://img.freepik.com/free-photo/air-ticket-flight-booking-concept_53876-122380.jpg",
    },
    {
      title: "Smart Healthcare Dashboards",
      text: "Track health, manage patients, and oversee hospital operations efficiently.",
      button: "Explore About",
      route: "/About",
      img: "https://media.istockphoto.com/id/1480239160/photo/an-analyst-uses-a-computer-and-dashboard-for-data-business-analysis-and-data-management.jpg?s=612x612&w=0&k=20&c=Zng3q0-BD8rEl0r6ZYZY0fbt2AWO9q_gC8lSrwCIgdk=",
    },
    {
      title: "Trusted by Specialists Worldwide",
      text: "Highly experienced doctors across multiple specialties at your service.",
      button: "Meet Doctors",
      route: "/Doctors",
      img: "https://images.pexels.com/photos/8460046/pexels-photo-8460046.jpeg?auto=compress&cs=tinysrgb&h=1080",
    },
    {
      title: "24/7 Telemedicine",
      text: "Secure video and chat consultations anytime, anywhere.",
      button: "Know services Now",
      route: "/services",
      img: "https://img.freepik.com/free-vector/hospital-care-facebook-template_23-2151152864.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      title: "Secure Payments & Records",
      text: "Manage payments and access your medical history in one place.",
      button: "Learn More",
      route: "/Faq",
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
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
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
              className="h-[70vh] sm:h-[90vh] bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-blue-900/50 to-teal-800/50"></div>

              {/* Content */}
              <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto text-white animate-fadeIn">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-2xl tracking-wide leading-snug">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-10 opacity-95 leading-relaxed">
                  {slide.text}
                </p>
                <button
                  onClick={() => navigate(slide.route)}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 
                             text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full 
                             shadow-lg transition transform hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
                >
                  {slide.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Thumbnail Slider */}
      <div className="max-w-4xl mx-auto mt-4 sm:mt-6 mb-12 px-2 sm:px-4">
        <Slider
          {...thumbSettings}
          asNavFor={nav1 as Slider}
          ref={(slider) => {
            setNav2(slider);
            slider2.current = slider;
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="px-1 sm:px-2">
              <img
                src={slide.img}
                alt={slide.title}
                className="h-14 sm:h-20 w-full object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 transition"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-0 left-0 w-56 h-56 sm:w-72 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float2"></div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1.2s ease-in-out forwards; }

        @keyframes float1 { 
          0%,100% { transform: translateY(0); } 
          50% { transform: translateY(-20px); } 
        }
        @keyframes float2 { 
          0%,100% { transform: translateY(0); } 
          50% { transform: translateY(20px); } 
        }
        .animate-float1 { animation: float1 7s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default HeroSlider;
