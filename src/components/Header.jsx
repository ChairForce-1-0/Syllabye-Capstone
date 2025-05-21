/*---+---+---+--Start of Header.jsx Block---+---+---+--*/

/**
 * Header.jsx - The Application Header Component
 * This component provides:
 * - Main application header with logo
 * - Language switching functionality
 * - Navigation drawer integration
 * - Responsive design
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import DrawerNav from "./DrawerNav";           // Side navigation component
import { useTranslation } from 'react-i18next'; // Internationalization
import "./Header.css";                         // Component-specific styles
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const Header = () => {
    /*---+---+---+--Start of Translation Block---+---+---+--*/
    const { t, i18n } = useTranslation();      // Translation hook
    
    // Handles language switching between English and Spanish
    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };
    /*---+---+---+--End of Translation Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <header id="header" className="content-block header-wrapper">
            {/*---+---+---+--Start of Navigation Block---+---+---+--*/}
            <DrawerNav />  {/* Side navigation drawer */}
            {/*---+---+---+--End of Navigation Block---+---+---+--*/}

            <div className="header-wrapper-inner">
                {/*---+---+---+--Start of Logo Block---+---+---+--*/}
                <section className="center">
                    <img
                        src="/images/Syllabye-White-White.png"
                        className="logo-image"
                        alt={t('header.logoAlt')}  // Translated alt text
                    />
                    <div className="slogan">{t('header.mainSlogan')}</div>
                    <div className="secondary-slogan">{t('header.secondarySlogan')}</div>
                </section>
                {/*---+---+---+--End of Logo Block---+---+---+--*/}

                {/*---+---+---+--Start of Scroll Indicator Block---+---+---+--*/}
                <section className="bottom">
                    <a id="scrollToContent" href="#">
                        <img
                            src="/images/arrow_down.png"
                            alt={t('header.scrollDownAlt')}
                        />
                    </a>
                </section>
                {/*---+---+---+--End of Scroll Indicator Block---+---+---+--*/}
            </div>

            {/*---+---+---+--Start of Language Toggle Block---+---+---+--*/}
            <div
                style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                }}
            >
                <button onClick={() => switchLanguage('en')}>English</button>
                <button onClick={() => switchLanguage('es')}>Español</button>
            </div>
            {/*---+---+---+--End of Language Toggle Block---+---+---+--*/}
        </header>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default Header;  // Makes component available to App.jsx

/*---+---+---+--End of Header.jsx Block---+---+---+--*/