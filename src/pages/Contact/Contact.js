import React, { useState } from "react";
import "./Contact.scss";
import location from "../../assets/img/location.png";
import phone from "../../assets/img/phone.png";
import github from "../../assets/img/github.png";
import mail from "../../assets/img/mail.png";
import { toast } from "react-toastify";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return;
    }

    toast.success("Form submitted successfully");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  return (
    <div className="contact-form">
      <h2 className="contact-form__title">Contact Us</h2>
      <form className="contact-form__form" onClick={handleSubmit}>
        <div className="contact-form__field">
          <label htmlFor="name" className="contact-form__label">
            Name
          </label>
          <input
            placeholder="Full Name"
            type="text"
            id="name"
            name="name"
            className="contact-form__input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor="email" className="contact-form__label">
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            className="contact-form__input"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor="subject" className="contact-form__label">
            Subject
          </label>
          <input
            placeholder="Subject"
            type="text"
            id="subject"
            name="subject"
            className="contact-form__input"
            required
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor="message" className="contact-form__label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="contact-form__textarea"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="contact-form__field">
          <button type="submit" className="contact-form__submit">
            Submit
          </button>
        </div>
      </form>
      <div className="contact-form__details">
        <h2>Our Contact Information</h2>
        <p>Fill the form or use other channels listed below</p>
        <span className="contact-form__details-box">
          <img className="contact-form__img" src={phone} alt="icon-contact" />
          <p>+33 472586789</p>
        </span>
        <span className="contact-form__details-box">
          <img className="contact-form__img" src={mail} alt="icon-contact" />
          <p>support@eshop.com</p>
        </span>
        <span className="contact-form__details-box">
          <img
            className="contact-form__img"
            src={location}
            alt="icon-contact"
          />
          <p>Paris, France</p>
        </span>
        <span className="contact-form__details-box">
          <img className="contact-form__img" src={github} alt="icon-contact" />
          <p>@burgundythedev</p>
        </span>
      </div>
    </div>
  );
};

export default Contact;
