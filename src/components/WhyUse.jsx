/*---+---+---+--Start of WhyUse.jsx Block---+---+---+--*/

/**
 * WhyUse.jsx - Feature Showcase Component
 * This component:
 * - Displays key features/benefits of the platform
 * - Supports internationalization for all text
 * - Provides navigation links to relevant sections
 * - Shows visually appealing cards with images and descriptions
 */

import "./WhyUse.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/*---+---+---+--Start of Reasons Data Block---+---+---+--*/
/**
 * reasons - Feature Showcase Data
 * Contains image paths, translation keys, and navigation links
 * for each platform feature/benefit
 */
const reasons = [
  {
    imgSrc: "/images/upload-laptop.jpeg",
    titleKey: "whyUse.reasons.uploadSyllabi.title",
    descKey: "whyUse.reasons.uploadSyllabi.desc",
    link: "/browse",
  },
  {
    imgSrc: "/images/lightbulbs.jpeg",
    titleKey: "whyUse.reasons.createNewSyllabi.title",
    descKey: "whyUse.reasons.createNewSyllabi.desc",
    link: "/create",
  },
  {
    imgSrc: "/images/laptop-board.jpg",
    titleKey: "whyUse.reasons.viewDownloadSyllabi.title",
    descKey: "whyUse.reasons.viewDownloadSyllabi.desc",
    link: "/browse",
  },
];
/*---+---+---+--End of Reasons Data Block---+---+---+--*/


/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * WhyUse - Feature Showcase Component
 * @returns {JSX.Element} - Section with feature cards and descriptions
 */
const WhyUse = () => {
  const { t } = useTranslation();

  return (
    <section id="why-use" className="why-use-section content-block">
      <div className="container">
        {/* Section Header */}
        <header className="block-heading">
          <h2 className="about-subtitle">{t("whyUse.title")}</h2>
        </header>

        {/* Feature Cards */}
        <section className="block-body">
          <div className="row">
            {reasons.map((reason, index) => (
              <div key={index} className="col-md-4 col-sm-12 mb-4">
                <div className="blog-post">
                  {/* Feature Image */}
                  <img src={reason.imgSrc} alt={t(reason.titleKey)} />
                  
                  {/* Feature Title with Link */}
                  <Link to={reason.link}>
                    <h3>{t(reason.titleKey)}</h3>
                  </Link>
                  
                  {/* Feature Description */}
                  <p>{t(reason.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default WhyUse;
/*---+---+---+--End of WhyUse.jsx Block---+---+---+--*/