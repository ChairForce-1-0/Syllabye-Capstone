/*---+---+---+--Start of AboutPage.jsx Block---+---+---+--*/

/**
 * AboutPage.jsx - The About Page Component
 * Displays information about the application and development team
 * Features:
 * - Multilingual content support
 * - Team member carousel
 * - Language switching
 */

import "./AboutPage.css";
import { useTranslation } from 'react-i18next';
import "bootstrap/dist/css/bootstrap.min.css";
import TeamCarousel from '../components/TeamCarousel';
import React from 'react';

/*---+---+---+--Start of Team Data Block---+---+---+--*/
/**
 * currentTeamMembers - Team Member Information
 * Contains image paths, names, and links for all team members
 * Organized by:
 * - Current team
 * - The Dev Den members
 * - Previous members
 */
const currentTeamMembers = [
  // Current Team
  { imgSrc: "/images/ChairForceOne-Logo.png", name: "chair", link: "https://github.com/ChairForce-1-0/Syllabye-Capstone" },
  { imgSrc: "/images/irving-portrait.png", name: "irving", link: "https://irvingfsanchez.github.io/IrvingFSanchez-Professional-Website/" },
  { imgSrc: "/images/nick-portrait.png", name: "nick", link: "https://krzysiaknick.github.io/" },
  { imgSrc: "/images/jaiden-portrait.png", name: "jaiden", link: "https://jtleon301.github.io/" },
  { imgSrc: "/images/bryan-portrait.png", name: "bryan", link: "https://bryana55.github.io/" },
  
  // The Dev Den
  { imgSrc: "/images/dev-den.png", name: "devden", link: "https://github.com/ChairForce-1-0/Syllabye-Capstone" },
  { imgSrc: "/images/ethan.png", name: "ethan", link: "#" },
  { imgSrc: "/images/yash.jpg", name: "yash", link: "#" },
  { imgSrc: "/images/Joshua-V.png", name: "joshua", link: "#" },
  
  // Previous Members
  { imgSrc: "/images/krabby.png", name: "krabby", link: "https://github.com/ChairForce-1-0/Syllabye-Capstone" },
  { imgSrc: "/images/josh.png", name: "josh", link: "#" },
  { imgSrc: "/images/kevin.png", name: "kevin", link: "#" },
  { imgSrc: "/images/logan.png", name: "logan", link: "#" },
  { imgSrc: "/images/olivia-1.png", name: "olivia", link: "#" },
  { imgSrc: "/images/Emilio.png", name: "emilio", link: "#" },
  { imgSrc: "/images/vykle.jpg", name: "vy", link: "#" },
  { imgSrc: "/images/other-kevin.png", name: "kevinZ", link: "#" }
];
/*---+---+---+--End of Team Data Block---+---+---+--*/


/*---+---+---+--Start of About Component Block---+---+---+--*/
const About = () => {
  const { t, i18n } = useTranslation();

  /**
   * teamMembersCarousel - Localized Team Data
   * Maps team member data with translated names and descriptions
   * Memoized to prevent unnecessary re-renders
   */
  const teamMembersCarousel = React.useMemo(() => 
    currentTeamMembers.map(member => ({
      ...member,
      name: t(`team.members.${member.name}.name`),
      role: t(`team.members.${member.name}.description`)
    })),
  [t]);

  // Handles language switching between English and Spanish
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="about-page">
      {/*---+---+---+--Start of Language Toggle Block---+---+---+--*/}
      <div className="language-toggle">
        <button 
          onClick={() => switchLanguage('en')}
          className="language-button english"
        >
          English
        </button>
        <button 
          onClick={() => switchLanguage('es')}
          className="language-button spanish"
        >
          Español
        </button>
      </div>
      {/*---+---+---+--End of Language Toggle Block---+---+---+--*/}

      <div className="about-container">
        <div className="about-text-container">
          {/*---+---+---+--Start of About Content Block---+---+---+--*/}
          <h1 className="about-title">{t('about.title')}</h1>
          <p className="about-description">
            {t('about.description')}
          </p>

          {/* How To Use Section */}
          <section aria-labelledby="how-to-use">
            <h2 className="about-subtitle" id="how-to-use">
              {t('about.howToUse')}
            </h2>
          </section>

          {/* Professors Section */}
          <section aria-labelledby="professors-section">
            <h2 className="about-subtitle" id="professors-section">
              {t('about.professors')}
            </h2>
            <p className="about-description">
              {t('about.professorsDesc1')}
            </p>
            <p className="about-description">
              {t('about.professorsDesc2')}
            </p>
          </section>

          {/* Students Section */}
          <section aria-labelledby="students-section">
            <h2 className="about-subtitle" id="students-section">
              {t('about.students')}
            </h2>
            <p className="about-description">
              {t('about.studentsDesc')}
            </p>
          </section>
          {/*---+---+---+--End of About Content Block---+---+---+--*/}
        </div>
      </div>

      {/*---+---+---+--Start of Team Section Block---+---+---+--*/}
      <section 
        className="about-team"
        aria-label="Team members carousel"
      >
        <h2 className="about-subtitle">
          {t('about.meetOurTeam')}
        </h2>
        <TeamCarousel 
          teamMembers={teamMembersCarousel}
          key={i18n.language} // Force re-render on language change
        />
      </section>
      {/*---+---+---+--End of Team Section Block---+---+---+--*/}
    </div>
  );
};
/*---+---+---+--End of About Component Block---+---+---+--*/

export default About;

/*---+---+---+--End of AboutPage.jsx Block---+---+---+--*/