/*---+---+---+--Start of Services.jsx Block---+---+---+--*/

/**
 * Services.jsx - The Services Showcase Component
 * This component provides:
 * - Parallax background with service offerings
 * - Multi-language support for all content
 * - Responsive grid layout for service items
 * - Font Awesome icon integration
 * - Consistent styling with theme
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import "./Services.css";                      // Component-specific styles
import typewriter from "/images/typewriter.jpeg";  // Background image
import { useTranslation } from "react-i18next";  // Internationalization
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Services Data Block---+---+---+--*/
const servicesData = [
    {
        icon: "fa-laptop",
        titleKey: "services.bootstrapReactTitle",   // i18n key for title
        descKey: "services.bootstrapReactDesc"     // i18n key for description
    },
    {
        icon: "fa-cogs",
        titleKey: "services.firebaseTitle",
        descKey: "services.firebaseDesc"
    },
    {
        icon: "fa-pencil-square",
        titleKey: "services.nodejsTitle",
        descKey: "services.nodejsDesc"
    }
];
/*---+---+---+--End of Services Data Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const Services = () => {
    /*---+---+---+--Start of Translation Block---+---+---+--*/
    const { t } = useTranslation();  // Translation hook
    /*---+---+---+--End of Translation Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <section
            id="services"
            className="parallax"
            style={{
                backgroundImage: `url(${typewriter})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed"
            }}
            aria-label={t("services.ariaLabel")}
        >
            <div className="container text-center">
                {/*---+---+---+--Start of Header Block---+---+---+--*/}
                <header className="block-head">
                    <h1>{t("services.title")}</h1>
                </header>
                {/*---+---+---+--End of Header Block---+---+---+--*/}

                {/*---+---+---+--Start of Services Grid Block---+---+---+--*/}
                <section className="block-body">
                    <div className="row">
                        {servicesData.map((service, index) => (
                            <div key={index} className="col-md-4">
                                <div className="service">
                                    <i className={`fa ${service.icon}`} aria-hidden="true"></i>
                                    <h2>{t(service.titleKey)}</h2>
                                    <p>{t(service.descKey)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/*---+---+---+--End of Services Grid Block---+---+---+--*/}
            </div>
        </section>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default Services;  // Makes component available to routing

/*---+---+---+--End of Services.jsx Block---+---+---+--*/