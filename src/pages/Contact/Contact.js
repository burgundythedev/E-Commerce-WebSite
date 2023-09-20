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
      <div className="contact-form__background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h2 className="contact-form__title">Contact Us</h2>
      <p className="contact-form__text"></p>
      <div className="contact-form__container">
        <form className="contact-form__form" onClick={handleSubmit}>
          <div className="contact-form__field">
            <label htmlFor="name" className="contact-form__label">
              Name:
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
              Email:
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
              Subject:
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
              Message:
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
          <div className="contact-form__button-box">
            <button type="submit" className="contact-form__submit">
              Submit
            </button>
          </div>
        </form>
        <div className="contact-form__details">
          <h2 className="contact-form__details-title">Contact Informations</h2>
          <p className="contact-form__details-text">
            Fill the form or use other channels listed below
          </p>
          <span className="contact-form__details-contacts">
            <img className="contact-form__img" src={phone} alt="icon-contact" />
            <p className="contact-form__details-text">+33 172586789</p>
          </span>
          <span className="contact-form__details-contacts">
            <img className="contact-form__img" src={mail} alt="icon-contact" />
            <p className="contact-form__details-text">support@eshop.com</p>
          </span>
          <span className="contact-form__details-contacts">
            <img
              className="contact-form__img"
              src={location}
              alt="icon-contact"
            />
            <p className="contact-form__details-text">Paris, France</p>
          </span>
          <span className="contact-form__details-contacts">
            <img
              className="contact-form__img"
              src={github}
              alt="icon-contact"
            />
            <p className="contact-form__details-text">@burgundythedev</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
