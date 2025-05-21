/*---+---+---+--Start of TeamCarousel.jsx Block---+---+---+--*/

/**
 * TeamCarousel.jsx - Animated Team Member Carousel Component
 * This component:
 * - Creates an infinite horizontal scrolling carousel of team members
 * - Uses GSAP for smooth animations and performance
 * - Supports manual navigation with arrow buttons
 * - Pauses animation on hover for better UX
 * - Handles responsive resizing
 */

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * TeamCarousel - Infinite Scrolling Carousel Component
 * @param {Array} teamMembers - Array of team member objects with name, role, image, and link
 * @returns {JSX.Element} - Animated carousel with navigation controls
 */
const TeamCarousel = ({ teamMembers }) => {
  // Refs for DOM elements and animations
  const marqueeRef = useRef(null);
  const animation = useRef(null);
  const clones = useRef([]);

  /*---+---+---+--Start of Animation Setup Block---+---+---+--*/
  /**
   * useEffect - Animation Initialization and Management
   * Handles:
   * - Setting up the infinite scrolling animation
   * - Cloning items for seamless looping
   * - Adding hover pause/resume functionality
   * - Handling window resize events
   */
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let ctx = gsap.context(() => {
      // Clear existing clones
      clones.current.forEach((clone) => clone.remove());
      clones.current = [];

      // Get original items
      const items = gsap.utils.toArray(".marquee-item", marquee);
      if (!items.length) return;

      // Clone items for seamless looping
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        marquee.appendChild(clone);
        clones.current.push(clone);
      });

      // Calculate total width of all items
      const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);

      // Create infinite scrolling animation
      animation.current = gsap.to(marquee, {
        x: `-=${totalWidth * 2}`,
        duration: 60,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const wrapped = x % totalWidth;
            return wrapped;
          }),
        },
      });

      // Pause/resume on hover
      marquee.addEventListener("mouseenter", () => animation.current.pause());
      marquee.addEventListener("mouseleave", () => animation.current.resume());
    }, marquee);

    // Handle window resize
    const onResize = () => {
      ctx.revert();
      ctx.init();
    };

    window.addEventListener("resize", onResize);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, [teamMembers]);
  /*---+---+---+--End of Animation Setup Block---+---+---+--*/


  /*---+---+---+--Start of Navigation Block---+---+---+--*/
  /**
   * navigate - Manual Carousel Navigation
   * @param {string} direction - 'next' or 'prev' for navigation direction
   * Handles smooth snapping to next/previous team member
   */
  const navigate = (direction) => {
    if (!animation.current) return;

    const progress = animation.current.progress();
    const snapPoint = gsap.utils.snap(
      1 / teamMembers.length,
      direction === "next"
        ? progress + 1 / teamMembers.length
        : progress - 1 / teamMembers.length
    );

    gsap.to(animation.current, {
      progress: snapPoint,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };
  /*---+---+---+--End of Navigation Block---+---+---+--*/


  /*---+---+---+--Start of Render Block---+---+---+--*/
  return (
    <div className="marquee-container">
      <div className="marquee-wrapper">
        {/* Marquee Container with Team Members */}
        <div className="marquee" ref={marqueeRef}>
          {teamMembers.map((member, index) => (
            <div key={index} className="marquee-item">
              <article className="member">
                <a
                  className="member-link"
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Team Member Image */}
                  <figure className="member-img-wrapper">
                    <img
                      className="member-img"
                      src={member.imgSrc}
                      alt={member.name}
                      loading="lazy"
                    />
                  </figure>

                  {/* Team Member Details */}
                  <figcaption className="member-details">
                    <h3 className="member-title">{member.name}</h3>
                    <p className="member-subtitle">{member.role}</p>
                  </figcaption>
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="marquee-arrow arrow-prev"
        onClick={() => navigate("prev")}
        aria-label="Previous team member"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
        </svg>
      </button>
      <button
        className="marquee-arrow arrow-next"
        onClick={() => navigate("next")}
        aria-label="Next team member"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
        </svg>
      </button>
    </div>
  );
  /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Main Component Block---+---+---+--*/


/*---+---+---+--Start of PropTypes Block---+---+---+--*/
/**
 * PropTypes - Component Property Validation
 * Defines required props and their types
 */
TeamCarousel.propTypes = {
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};
/*---+---+---+--End of PropTypes Block---+---+---+--*/

export default TeamCarousel;
/*---+---+---+--End of TeamCarousel.jsx Block---+---+---+--*/