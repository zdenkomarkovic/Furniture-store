import React from "react";
import Header from "../../Components/Header/Header";

import "./Contact.scss";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [message, setMessage] = useState({});
  const handleInput = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
    console.log(message);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // poslati poruku na mail
  };
  return (
    <>
      <Header title="Contact" />
      <div className="container contact-page">
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="contact-wrapper"
        >
          <div className="contact-details">
            <span>
              Number: <a href="tel:+348956589595">+348 95 6589595</a>
            </span>
            <span>
              Mail:{" "}
              <a href="mailto:audiophile@gmail.com">audiophile@gmail.com</a>
            </span>
            <p>Adress: Madame Tussaudss, 10178 Berlin, Germany</p>
          </div>
          <form action="" className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              onChange={handleInput}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your mail..."
              onChange={handleInput}
            />
            <textarea
              name="message"
              id=""
              cols="27"
              rows="3"
              placeholder="Enter your message..."
              onInput={handleInput}
            ></textarea>
            <button>Submit</button>
          </form>
        </motion.div>
        <motion.div
          whileInView={{ y: [200, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8 }}
          className="map"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.9141816047772!2d13.379016877066302!3d52.51689213645915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c42700e8af%3A0xee1657523774c9d8!2sMadame%20Tussauds%20Berlin!5e0!3m2!1sen!2srs!4v1696602221536!5m2!1sen!2srs"
            loading="lazy"
            className="container map"
          ></iframe>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
