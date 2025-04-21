import React from "react";
import "./ContactPage.css";
import { useTranslation } from "react-i18next";
import "./AboutPage.css"; // for language toggle styling

const ContactPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="contact-page">

      <div className="contact-container">
        {/* Left Side: Text Content */}
        <div className="contact-text-container">
          <h2 className="contact-title">{t("contact.getInTouch")}</h2>
          <p className="contact-description">
            {t("contact.description")}
          </p>

          <h2 className="contact-title">{t("contact.emailTitle")}</h2>
          <p className="contact-description">
            {t("contact.emailText")}{" "}
            <a href="mailto:syllabyespt@gmail.com">syllabyespt@gmail.com</a>
          </p>

          <img
            src="/images/Syllabye-White-White.png"
            className="logo-image"
            alt="Syllabye Logo"
          />
        </div>

        {/* Right Side: Forms */}
        <div className="contact-forms-container">
          {/* First Google Form */}
          <div className="contact-form">
            <h2 className="contact-formbox">{t("contact.professorFeedback")}</h2>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSf8QAJQsBaWtQDrELzPJyyeswv4gBxNsipCyorEFurwnjOXOQ/viewform?embedded=true"
              title="Professor Feedback Form"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>

          {/* Second Google Form */}
          <div className="contact-form">
            <h2 className="contact-formbox">{t("contact.studentFeedback")}</h2>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSccl6nMP9wQEbIqW5XRH_7s94I6s-yQDyov4f9P3xZahiGlag/viewform?embedded=true"
              title="Student Feedback Form"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
