import React from "react";
import "./ContactPage.css"; // Import the updated CSS file

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        
        {/* Left Side: Text Content */}
        <div className="contact-text-container">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-description">
            Have questions or feedback? Feel free to reach out to us using the forms on the right based on your use case. 
            We're happy to assist you!
          </p>

          <h2 className="contact-title">Need Help? Email Us!</h2>
          <p className="contact-description">
            Contact us at: <a href="mailto:syllabyespt@gmail.com">syllabyespt@gmail.com</a>
          </p>

          <img src="/images/Syllabye-White-White.png" className="logo-image" alt="Syllabye Logo" />
        </div>

        {/* Right Side: Forms */}
        <div className="contact-forms-container">
          {/* First Google Form */}
          <div className="contact-form">
            <h2 className="contact-formbox">Professor Feedback</h2>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf8QAJQsBaWtQDrELzPJyyeswv4gBxNsipCyorEFurwnjOXOQ/viewform?embedded=true" width="640" height="2191" frameborder="0" marginheight="0" marginwidth="0">Loading…
            </iframe>
          </div>

          {/* Second Google Form */}
          <div className="contact-form">
            <h2 className="contact-formbox">Student Feedback</h2>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSccl6nMP9wQEbIqW5XRH_7s94I6s-yQDyov4f9P3xZahiGlag/viewform?embedded=true" width="640" height="808" frameborder="0" marginheight="0" marginwidth="0">Loading…
            </iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;


