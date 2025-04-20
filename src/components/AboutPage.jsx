import "./AboutPage.css";
import { useTranslation } from 'react-i18next';
import "bootstrap/dist/css/bootstrap.min.css";
import TeamCarousel from '../components/TeamCarousel';
import React from 'react'; // Explicit React import

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
  { imgSrc: "/images/anon.png", name: "yash", link: "#" },
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

const About = () => {
  const { t, i18n } = useTranslation();

  // Memoize to prevent unnecessary re-renders
  const teamMembersCarousel = React.useMemo(() => 
    currentTeamMembers.map(member => ({
      ...member,
      name: t(`team.members.${member.name}.name`),
      role: t(`team.members.${member.name}.description`)
    })),
  [t]); // Re-run when translations change

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="about-page">
      {/* Language toggle - move styles to CSS */}
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

      <div className="about-container">
        <div className="about-text-container">
          <h1 className="about-title">{t('about.title')}</h1>
          <p className="about-description">
            {t('about.description')}
          </p>

          {/* Section grouping for better semantics */}
          <section aria-labelledby="how-to-use">
            <h2 className="about-subtitle" id="how-to-use">
              {t('about.howToUse')}
            </h2>
          </section>

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

          <section aria-labelledby="students-section">
            <h2 className="about-subtitle" id="students-section">
              {t('about.students')}
            </h2>
            <p className="about-description">
              {t('about.studentsDesc')}
            </p>
          </section>
        </div>
      </div>

      {/* Team Section - Add aria label */}
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
    </div>
  );
};

export default About;