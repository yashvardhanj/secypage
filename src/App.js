// src/App.js
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import teamMembers from './teamData'; // Importing team data
import secretrait from './secretariat'; // Importing secretariat data

gsap.registerPlugin(ScrollTrigger);

function App() {
  const scrollDownRef = useRef(null);
  const [isSecretariat, setIsSecretariat] = useState(false); // State to toggle data
  const [currentData, setCurrentData] = useState(teamMembers); // Current dataset

  const toggleData = () => {
    if (isSecretariat) {
      setCurrentData(teamMembers);
    } else {
      setCurrentData(secretrait);
    }
    setIsSecretariat(!isSecretariat);
  };

  useEffect(() => {
    const mediaAnimation = gsap.matchMedia();

    ScrollTrigger.defaults({
      markers: false,
    });

    const colors = ["#F3EDE3", "#B69354", "#CDC9E3", "#574A73", "#F3EDE3", "#B69354"];

    mediaAnimation.add("(min-width: 666px)", () => {
      // Desktop animations
      const details = gsap.utils.toArray(".desktopContentSection");
      const photos = gsap.utils.toArray(".desktopPhoto");

      gsap.set(photos, { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 });

      details.forEach((section, i) => {
        const bgColor = colors[i % colors.length]; // Cycle through colors

        // Assign a class based on background color for dynamic styling
        if (bgColor === "#F3EDE3") {
          section.classList.add("bg-light-cream");
        } else if (bgColor === "#B69354") {
          section.classList.add("bg-golden");
        } else if (bgColor === "#CDC9E3") {
          section.classList.add("bg-light-purple");
        } else if (bgColor === "#574A73") {
          section.classList.add("bg-dark-purple");
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            gsap.to(section, { backgroundColor: bgColor, duration: 1 });
          },
          onLeaveBack: () => {
            gsap.to(section, { backgroundColor: "#F3EDE3", duration: 1 });
          },
        });
      });

      details.forEach((detail, index) => {
        const headline = detail.querySelector(".reveal");
        const photo = photos[index];

        const animation = gsap.timeline({
          scrollTrigger: {
            trigger: headline,
            start: "top 100%",
            end: "top 60%",
            scrub: 0.5,
            markers: false,
          },
        })
          .to(photo, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 })
          .to(headline, { opacity: 1, y: 0, duration: 1.5 }, "-=1.5");

        return animation;
      });
    });

    mediaAnimation.add("(max-width: 665px)", () => {
      // Mobile animations
      const details = gsap.utils.toArray(".desktopContentSection");

      details.forEach((section, i) => {
        const bgColor = colors[i % colors.length]; // Cycle through colors

        // Assign a class based on background color for dynamic styling
        if (bgColor === "#F3EDE3") {
          section.classList.add("bg-light-cream");
        } else if (bgColor === "#B69354") {
          section.classList.add("bg-golden");
        } else if (bgColor === "#CDC9E3") {
          section.classList.add("bg-light-purple");
        } else if (bgColor === "#574A73") {
          section.classList.add("bg-dark-purple");
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            gsap.to(section, { backgroundColor: bgColor, duration: 1 });
          },
          onLeaveBack: () => {
            gsap.to(section, { backgroundColor: "#F3EDE3", duration: 1 });
          },
        });
      });
    });

    // Scroll Down Text Visibility
    ScrollTrigger.create({
      trigger: ".desktopContentSection:last-child",
      start: "top center",
      onEnter: () => {
        gsap.to(scrollDownRef.current, { opacity: 0, duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to(scrollDownRef.current, { opacity: 0.7, duration: 0.5 });
      },
    });

    // Initial state
    gsap.set(scrollDownRef.current, { opacity: 0.7 });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mediaAnimation.revert();
    };
  }, [currentData]); // Re-run animations when data changes

  return (
    <div className="gallery">
      <Header
        onToggle={toggleData}
        buttonText={isSecretariat ? "SHOW TEAM" : "SHOW SECRETARIAT"}
      />
      <div className="container">
        {currentData.map((member, index) => (
          <div key={index} className="content-section desktopContentSection">
            <div className="text">
              <h2 className="reveal">{member.name}</h2>
              <p>{member.role}</p>
              <div className="social-icons">
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on Facebook`}
                >
                  <FaFacebookF />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on Instagram`}
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div className="image desktopPhoto">
              <img src={member.image} alt={member.name} loading="lazy" />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Down Text */}
      <div className="scroll-down" ref={scrollDownRef}>
        Scroll down
      </div>
    </div>
  );
}

export default App;