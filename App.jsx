import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import 'remixicon/fonts/remixicon.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef(null);
  const videoSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const slideshow1Ref = useRef(null);
  const slideshow2Ref = useRef(null);
  
  // GTA games for slideshows
  const slideshow1Games = [
    { title: "Grand Theft Auto", year: "1997", image: "gta1.jpg" },
    { title: "Grand Theft Auto: London 1969", year: "1999", image: "./gtalondon.jpg" },
    { title: "Grand Theft Auto 2", year: "1999", image: "./liberty.jpg" },
    { title: "Grand Theft Auto III", year: "2001", image: "./GTA3.jpg" },
    { title: "Grand Theft Auto: Vice City", year: "2002", image: "./vicecity.jpg" },
    { title: "Grand Theft Auto: San Andreas", year: "2004", image: "./san.jpg" },
    { title: "Grand Theft Auto: Liberty City Stories", year: "2005", image: "./liberty.jpg" }
  ];
  
  const slideshow2Games = [
    { title: "Grand Theft Auto: Vice City Stories", year: "2006", image: "gta6poster.jpg" },
    { title: "Grand Theft Auto IV", year: "2008", image: "./gta4.webp" },
    { title: "Grand Theft Auto: Episodes From Liberty City", year: "2009", image: "ep.jpeg" },
    { title: "The Lost and Damned", year: "2009", image: "lost.jpg" },
    { title: "Grand Theft Auto V", year: "2013", image: "./gta5.webp" },
    { title: "Grand Theft Auto Online", year: "2013", image: "./onlie.jpg" },
    { title: "Grand Theft Auto VI", year: "Coming Soon 2026", image: "6.png" }
  ];
  
  // Intro animation with mask
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to('.vi-mask-group', {
      rotate: 20,
      duration: 2,
      ease: 'power4.inOut',
      transformOrigin: '50% 50%',
    }).to('.vi-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: 'power4.inOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate() {
        if (this.progress() >= 0.9) {
          if (svgRef.current) svgRef.current.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, []);

  // Main page animations
  useGSAP(() => {
    if (!showContent || !mainRef.current) return;
    
    // Mouse parallax effect for hero section
    mainRef.current.addEventListener("mousemove", (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
        duration: 0.8
      });
      
      gsap.to(".car", {
        x: `${xMove * 0.4}%`,
        duration: 0.8
      });
      
      gsap.to(".sky", {
        x: `${xMove * 0.2}%`,
        duration: 0.8
      });
    });
    
    // Scroll animations
    gsap.to(".car", {
      y: "20%",
      scale: 0.8,
      scrollTrigger: {
        trigger: ".imagesdev",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(".sky", {
      y: "-20%",
      scrollTrigger: {
        trigger: ".imagesdev",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // 18+ logo animation
    gsap.fromTo(
      ".age-rating-logo",
      { 
        scale: 0, 
        rotation: -180,
        opacity: 0 
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        delay: 1,
        ease: "elastic.out(1, 0.5)"
      }
    );
    
    // Video section animations
    gsap.fromTo(
      ".video-container",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".video-section",
          start: "top 80%",
          end: "top 30%",
          scrub: true
        }
      }
    );
    
    // About section animations
    gsap.fromTo(
      ".about-content",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "top 30%",
          scrub: true
        }
      }
    );
    
    // Slideshow 1 animation (left to right)
    if (slideshow1Ref.current) {
      const slideshow1Cards = slideshow1Ref.current.querySelectorAll(".game-card");
      
      gsap.fromTo(
        slideshow1Cards,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slideshow1Ref.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
          }
        }
      );
      
      // Continuous sliding animation
      gsap.to(slideshow1Ref.current, {
        x: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: ".slideshow-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
    
    // Slideshow 2 animation (right to left)
    if (slideshow2Ref.current) {
      const slideshow2Cards = slideshow2Ref.current.querySelectorAll(".game-card");
      
      gsap.fromTo(
        slideshow2Cards,
        { x: "100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slideshow2Ref.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
          }
        }
      );
      
      // Continuous sliding animation
      gsap.to(slideshow2Ref.current, {
        x: "50%",
        ease: "none",
        scrollTrigger: {
          trigger: ".slideshow-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
    
    // Final GTA VI reveal animation
    gsap.fromTo(
      ".coming-soon",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".coming-soon",
          start: "top 80%",
          end: "top 30%",
          scrub: true
        }
      }
    );
    
  }, [showContent]);

  const svgRef = useRef(null);

  return (
    <>
      {/* SVG MASK INTRO */}
      <div
        ref={svgRef}
        className="svg fixed inset-0 z-[2] flex items-center justify-center h-screen w-full overflow-hidden bg-black"
      >
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="vimask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontSize="500"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="logo.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#vimask)"
          />
        </svg>
      </div>

      {/* MAIN CONTENT */}
      {showContent && (
        <div className="main w-full" ref={mainRef}>
          {/* HERO SECTION */}
          <div className="landing relative w-full min-h-screen overflow-hidden bg-black pb-[100px]">
            {/* NAVBAR */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full px-10 py-10">
              <div className="logo flex items-center gap-7">
                <div className="flex flex-col gap-[7px]">
                  <div className="h-1 w-10 bg-white" />
                  <div className="h-1 w-8 bg-white" />
                  <div className="h-1 w-6 bg-white" />
                </div>
                <h3 className="text-4xl font-bold text-white -mt-2">Rockstar</h3>
              </div>
            </div>

            {/* HERO SECTION */}
            <div className="imagesdev relative flex h-screen w-full items-center justify-center overflow-hidden">
              {/* GTA TITLE + CHARACTER */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-10 md:flex-row">
                {/* TITLE TEXT */}
                <div className="text space-y-2 leading-none uppercase font-extrabold text-white">
                  <h1 className="text-[12rem] leading-none -ml-20">Grand</h1>
                  <h1 className="text-[12rem] leading-none ml-20">Theft</h1>
                  <h1 className="text-[12rem] leading-none -ml-20">Auto</h1>
                </div>

                {/* CHARACTER IMAGE WITH 18+ LOGO */}
                <div className="relative">
                  <img
                    src="./new.png"
                    alt="Character"
                    className="h-auto w-[400px] md:w-[500px] object-contain"
                  />
                  
                  {/* 18+ LOGO */}
                  <div className="age-rating-logo absolute top-4 right-4 bg-red-600 text-white font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    18+
                  </div>
                </div>
              </div>

              {/* BACKGROUND SKY */}
              <img
                src="./newsky.png"
                alt="sky"
                className="sky scale-[1.2] absolute top-0 left-0 z-0 h-screen w-full object-cover"
              />

              {/* CAR IMAGE */}
              <img
                src="./car.png"
                alt="car"
                className="car absolute bottom-[-30%] left-1/2 z-5 w-[1400px] -translate-x-1/2 object-contain"
                style={{
                  filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))',
                }}
              />
            </div>

            {/* SCROLL DOWN (LEFT) */}
            <div className="absolute bottom-[100px] left-10 z-30 flex flex-col items-start gap-2 text-white">
              <div className="flex items-center gap-2">
                <i className="ri-arrow-down-fill text-2xl" />
                <h3 className="font-[helvetica_Now_Display] text-xl">Scroll Down</h3>
              </div>
            </div>

            {/* LOGOS (CENTER) */}
            <div className="absolute bottom-[80px] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.82), rgba(255,255,255,0))',
                }}
              />
              <div className="z-30 flex items-center gap-8">
                <img src="./whiteps5.png" alt="ps5" className="h-16 object-contain" />
                <span className="text-5xl text-white">|</span>
                <img src="./whitexbox.png" alt="xbox" className="h-16 object-contain" />
              </div>
            </div>

            {/* BOTTOM GRADIENT */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-10 h-[400px] w-full"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>

          {/* VIDEO SECTION */}
          <div ref={videoSectionRef} className="video-section relative w-full min-h-screen bg-black py-32">
            <div className="container mx-auto px-8">
              <h2 className="text-white text-6xl font-bold mb-16 text-center">
                <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                  Experience Grand Theft Auto
                </span>
              </h2>
              
              <div className="video-container relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl">
                {/* Video placeholder - in a real implementation, you would use a real video */}
                
                <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                        <i className="ri-play-fill text-white text-5xl ml-2"></i>
                      </div>
                    </div>
                  </div>
                  <img 
                    src="gta6.jpeg" 
                    alt="GTA VI Trailer" 
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                
                <div className="p-8 bg-gradient-to-b from-gray-900 to-black">
                  <h3 className="text-white text-3xl font-bold mb-4">GTA VI: Official Trailer</h3>
                  <p className="text-gray-300 text-lg">
                    Get a glimpse of the next chapter in the Grand Theft Auto series. Coming 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div ref={aboutSectionRef} className="about-section relative w-full min-h-screen bg-black py-32">
            <div 
              className="absolute inset-0 z-0 opacity-30"
              style={{
                background: 'radial-gradient(circle at center, #5a1b1b 0%, #000000 100%)',
              }}
            ></div>
            
            <div className="container mx-auto px-8 relative z-10">
              <div className="about-content grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-6xl font-bold mb-8 text-white">
                    <span className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
                      About The Franchise
                    </span>
                  </h2>
                  
                  <p className="text-gray-300 text-lg mb-6">
                    Grand Theft Auto (GTA) is an action-adventure video game series created by David Jones and Mike Dailly, later overseen by brothers Dan and Sam Houser, Leslie Benzies and Aaron Garbut.
                  </p>
                  
                  <p className="text-gray-300 text-lg mb-6">
                    The series is primarily developed by Rockstar North (formerly DMA Design) and published by Rockstar Games. The name of the series references the term "grand theft auto", used in the U.S. for motor vehicle theft.
                  </p>
                  
                  <p className="text-gray-300 text-lg">
                    Since its inception in 1997, the series has evolved from a simple top-down perspective action game to the complex, character-driven 3D open worlds the franchise is known for today.
                  </p>
                </div>
                
                <div className="relative">
                  <img 
                    src="./gta6.jpeg" 
                    alt="GTA Collection" 
                    className="w-full rounded-lg shadow-2xl"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-red-600 to-yellow-500 p-6 rounded-lg shadow-xl">
                    <p className="text-white text-xl font-bold">25+ Years of Gaming Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDESHOW SECTION - REPLACES TIMELINE */}
          <div className="slideshow-section relative w-full bg-black py-32 overflow-hidden">
            <div 
              className="absolute inset-0 z-0"
              style={{
                background: 'linear-gradient(to bottom, #000000 0%, #0c0c1d 50%, #000000 100%)',
              }}
            ></div>
            
            <div className="container mx-auto px-8 relative z-10 mb-32">
              <h2 className="text-center text-6xl font-bold mb-24 text-white">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  The GTA Legacy
                </span>
              </h2>
              
              {/* SLIDESHOW 1 - LEFT TO RIGHT */}
              <div className="mb-24">
                <h3 className="text-3xl font-bold text-white mb-8 pl-4 border-l-4 border-blue-500">Early Classics</h3>
                
                <div className="relative overflow-hidden">
                  <div 
                    ref={slideshow1Ref} 
                    className="slideshow-track flex space-x-6 py-4"
                    style={{ width: "200%" }} // Extra wide to allow for scrolling
                  >
                    {slideshow1Games.map((game, index) => (
                      <div 
                        key={index} 
                        className="game-card flex-none w-80 bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-800 transform transition-transform hover:scale-105"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={game.image} 
                            alt={game.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="year px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-sm font-bold">
                              {game.year}
                            </div>
                          </div>
                          
                          <h4 className="text-xl font-bold text-white mb-2">{game.title}</h4>
                          
                          <p className="text-gray-400 text-sm">
                            Introduced players to new gameplay innovations, expanding the GTA universe.
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Duplicate cards for infinite scroll effect */}
                    {slideshow1Games.map((game, index) => (
                      <div 
                        key={`duplicate-${index}`} 
                        className="game-card flex-none w-80 bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-800 transform transition-transform hover:scale-105"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={game.image} 
                            alt={game.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="year px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-sm font-bold">
                              {game.year}
                            </div>
                          </div>
                          
                          <h4 className="text-xl font-bold text-white mb-2">{game.title}</h4>
                          
                          <p className="text-gray-400 text-sm">
                            Introduced players to new gameplay innovations, expanding the GTA universe.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* SLIDESHOW 2 - RIGHT TO LEFT */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-8 text-right pr-4 border-r-4 border-purple-500">Modern Era</h3>
                
                <div className="relative overflow-hidden">
                  <div 
                    ref={slideshow2Ref} 
                    className="slideshow-track flex space-x-6 py-4 justify-end"
                    style={{ width: "200%" }} // Extra wide to allow for scrolling
                  >
                    {slideshow2Games.map((game, index) => (
                      <div 
                        key={index} 
                        className="game-card flex-none w-80 bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-800 transform transition-transform hover:scale-105"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={game.image} 
                            alt={game.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="year px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white text-sm font-bold">
                              {game.year}
                            </div>
                            {index === slideshow2Games.length - 1 && (
                              <span className="px-3 py-1 bg-red-600 rounded-full text-white text-sm font-bold animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                          
                          <h4 className="text-xl font-bold text-white mb-2">{game.title}</h4>
                          
                          <p className="text-gray-400 text-sm">
                            {index === slideshow2Games.length - 1 
                              ? "The most anticipated GTA game ever, featuring a new setting and groundbreaking technology." 
                              : "Pushing boundaries with innovative gameplay and immersive open worlds."}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Duplicate cards for infinite scroll effect */}
                    {slideshow2Games.map((game, index) => (
                      <div 
                        key={`duplicate-${index}`} 
                        className="game-card flex-none w-80 bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-800 transform transition-transform hover:scale-105"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={game.image} 
                            alt={game.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="year px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white text-sm font-bold">
                              {game.year}
                            </div>
                            {index === slideshow2Games.length - 1 && (
                              <span className="px-3 py-1 bg-red-600 rounded-full text-white text-sm font-bold animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                          
                          <h4 className="text-xl font-bold text-white mb-2">{game.title}</h4>
                          
                          <p className="text-gray-400 text-sm">
                            {index === slideshow2Games.length - 1 
                              ? "The most anticipated GTA game ever, featuring a new setting and groundbreaking technology." 
                              : "Pushing boundaries with innovative gameplay and immersive open worlds."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COMING SOON SECTION */}
          <div className="coming-soon relative w-full min-h-screen bg-black py-32 flex items-center justify-center overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/20 to-black"></div>
              <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
            </div>
            
            <div className="container mx-auto px-8 relative z-10 text-center">
              <h2 className="text-8xl font-black mb-8 text-white uppercase leading-tight">
                <span className="block">Grand Theft Auto</span>
                <span className="block text-9xl bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">VI</span>
              </h2>
              
              <p className="text-3xl text-white font-light mb-12">
                Coming <span className="font-bold">May 2026</span>
              </p>
              
              <div className="cta-buttons flex flex-wrap justify-center gap-6">
                <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white text-xl font-bold rounded-lg hover:from-red-700 hover:to-red-900 transition-all transform hover:scale-105 shadow-lg">
                  Pre-Order Now
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white text-xl font-bold rounded-lg hover:bg-white/10 transition-all transform hover:scale-105">
                  Join Community
                </button>
              </div>
              
              <div className="mt-16 flex justify-center gap-8">
                <img src="./whiteps5.png" alt="PS5" className="h-16 object-contain" />
                <span className="text-5xl text-white">|</span>
                <img src="./whitexbox.png" alt="Xbox" className="h-16 object-contain" />
                <span className="text-5xl text-white">|</span>
                <div className="h-16 flex items-center">
                  <span className="text-white text-2xl font-bold">PC</span>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="bg-black py-12 border-t border-gray-800">
            <div className="container mx-auto px-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="logo flex items-center gap-4 mb-8 md:mb-0">
                  <h3 className="text-3xl font-bold text-white">Rockstar Games</h3>
                </div>
                
                <div className="social-icons flex gap-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <i className="ri-twitter-fill text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <i className="ri-facebook-fill text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <i className="ri-instagram-fill text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <i className="ri-youtube-fill text-2xl"></i>
                  </a>
                </div>
              </div>
              
              <div className="text-center md:text-left text-gray-500 text-sm">
                <p>© 2025 Rockstar Games, Inc. All trademarks are property of their respective owners.</p>
                <p className="mt-2">This is a demo website created for illustrative purposes only.</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;