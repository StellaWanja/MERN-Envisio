import "./ContactPage.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Footer from "../../components/Footer/Footer";
import TopNavigation from "../../components/TopNavigation/TopNavigation";

const SERVICE_ID = "service_c7843wa";
const TEMPLATE_ID = "template_09u1kpg";
const USER_ID = "user_CDbR0JB1ykYvbuG7Zti4G";

const ContactPage = () => {
    const form = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      // eslint-disable-next-line no-unused-vars
      (result) => {
        Swal({
          icon: "success",
          title: "Message Sent Successfully",
          button: "OK",
        });
        e.target.reset();
      },
      (error) => {
        return Swal({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
  };

  return (
    <>
      <div className="contact-body">
        <div>
          <TopNavigation />
        </div>
        <div>
          <img
            src="https://i.ibb.co/fpKjHQw/Rectangle-637.png"
            alt="header"
            className="header-image"
          />
        </div>
        <h2 className="header">Get In Touch By Filling Out This Form</h2>
        <form ref={form} onSubmit={handleOnSubmit} className="form-body">
          <div className="input-section">
            <div className="input-box">
              <label htmlFor="name">Name</label>
              <input
                id="form-input-control-last-name"
                label="Name"
                name="user_name"
                required
                className="input-area"
              />
            </div>

            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                id="form-input-control-email"
                label="Email"
                name="user_email"
                required
                className="input-area"
              />
            </div>

            <div className="input-box">
              <label htmlFor="message">Message</label>
              <textarea
                id="form-textarea-control-opinion"
                label="Message"
                name="user_message"
                required
                className="textarea"
              />
            </div>
          </div>
          <input className="submit-button" type="submit" value="Send" />
        </form>
        <img
          src="https://i.ibb.co/9HfjXmj/trafalgar-illustration-sec02-2.png"
          alt="trafalgar-illustration-sec02-2"
          className="image"
        />
        <div className="clear"></div>
      </div>
      <Footer />
    </>
  );
};
export default ContactPage;
