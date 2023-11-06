import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footer-images">
        <div className="image-container">
          <img
            src="https://i.ibb.co/xXYxMsK/Page-1.png"
            alt="tech4dev"
            className="tech4dev"
          />

          <img
            src="https://i.ibb.co/KjbQ0X7/18198736-1709037099397233-3067221660822004299-n-1.png"
            alt="nwt"
            className="nwt"
          />
          <img
            src="https://i.ibb.co/B4mPmTd/58480fd7cef1014c0b5e4943-1.png"
            alt="microsoft"
            className="microsoft"
          />
        </div>
      </div>

      <img
        src="https://i.ibb.co/7C52Mmv/logo.png"
        className="footer-logo"
        alt="logo"
      />

      <div className="footer-links">
        <div className="left-links">
          <ul className="link-list">
            <li>
              <a
                href="#about"
                style={{ color: "#212121", textDecoration: "none" }}
              >
                About
              </a>{" "}
            </li>
            <li>Blog</li>
            <li>
              <Link
                to="/contactpage#top"
                style={{ color: "#212121", textDecoration: "none" }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="social-media">
          <img
            src="https://i.ibb.co/wL9f4dG/twitter.png"
            alt="twitter"
            className="twitter icon-link"
          />
          <img
            src="https://i.ibb.co/z69gkWD/ig-big.png"
            alt="instagram"
            className="instagram icon-link"
          />

          <a href="mailto:contactenvisio@gmail.com?subject=Contact%20Form%20Message">
            <img
              src="https://i.ibb.co/Zmxq66X/email.png"
              alt="email"
              className="email icon-link"
            />
          </a>
        </div>

        <div className="right-links">
          <ul className="link-list">
            <li>Privacy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
        <div className="clear"></div>
      </div>

      <div className="bottom">
        <p className="copyright">Copyright © 2021 Envisio</p>
        <a href="#top" className="top-link" style={{ color: "#F295CF" }}>
          Back To Top
        </a>
      </div>
    </>
  );
}
