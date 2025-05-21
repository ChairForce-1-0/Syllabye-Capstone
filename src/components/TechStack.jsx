/*---+---+---+--Start of TechStack.jsx Block---+---+---+--*/

/**
 * TechStack.jsx - Technology Stack Carousel Component
 * This component:
 * - Displays a responsive carousel of technology logos
 * - Supports internationalization for alt text and labels
 * - Includes GitHub repository link
 * - Auto-plays with responsive breakpoints
 */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TechStack.css";
import { useTranslation } from "react-i18next";

/*---+---+---+--Start of Tech Logos Data Block---+---+---+--*/
/**
 * techLogos - Technology Logo Definitions
 * Contains image paths and translation keys for all tech stack items
 */
const techLogos = [
  { src: "/images/vscode.png", altKey: "vscode" },
  { src: "/images/css.png", altKey: "css" },
  { src: "/images/html.png", altKey: "html" },
  { src: "/images/js.png", altKey: "js" },
  { src: "/images/bootstrap.png", altKey: "bootstrap" },
  { src: "/images/nodejs.png", altKey: "nodejs" },
  { src: "/images/react.png", altKey: "react" },
  { src: "/images/github.png", altKey: "github" },
  { src: "/images/git.png", altKey: "git" },
  { src: "/images/firebase.png", altKey: "firebase" },
];
/*---+---+---+--End of Tech Logos Data Block---+---+---+--*/


/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * TechStack - Technology Stack Display Component
 * @returns {JSX.Element} - Responsive carousel of technology logos
 */
const TechStack = () => {
  const { t } = useTranslation();

  /*---+---+---+--Start of Slider Settings Block---+---+---+--*/
  /**
   * settings - Carousel Configuration
   * Defines behavior and responsiveness of the logo carousel
   */
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };
  /*---+---+---+--End of Slider Settings Block---+---+---+--*/

  return (
    <section id="tech-stack" className="content-block">
      <div
        className="container"
        style={{ marginBottom: "-18%", paddingBottom: "0px" }}
      >
        {/* Header with Title and GitHub Button */}
        <header className="block-headge">
          <h1>{t("techStack.title")}</h1>
          <a
            href="https://github.com/ChairForce-1-0/Syllabye-Capstone"
            className="btn btn-o btn-lg github-button"
          >
            {t("techStack.githubRepo")}
          </a>
        </header>

        {/* Subtitle */}
        <strong>
          <p className="tech-subtitle">{t("techStack.subtitle")}</p>
        </strong>

        {/* Logo Carousel */}
        <div className="slider-fade-wrapper">
          <div className="slider-container">
            <Slider {...settings}>
              {techLogos.map((logo, index) => (
                <div key={index} className="slide">
                  <img
                    src={logo.src}
                    alt={t(`techStack.altText.${logo.altKey}`)}
                    height="100"
                    width="100"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default TechStack;
/*---+---+---+--End of TechStack.jsx Block---+---+---+--*/