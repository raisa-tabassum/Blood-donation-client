import React from "react";
import Logo from "../Logo/Logo";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="shadow-md">
      <footer className="footer sm:footer-horizontal bg-base-200 text-accent p-10">
        <aside>
          <Logo></Logo>
          <p className="text-md md:text-lg">
            Save Lives Through Blood Donation
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Volunteers</a>
          <a className="link link-hover">FAQs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover">+88 961 876 54321</a>
          <a className="link link-hover">bloodconnect@support.com</a>
          <a className="link link-hover">45 Anywhere St, Wari, Uk</a>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content border-base-300 border-t px-10 py-3 items-center">
        <p className="text-neutral">Copyright © {new Date().getFullYear()} - All right reserved.</p>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="footer-title">
            <p>Social Logins</p>
          </div>
          <div className="grid grid-flow-col gap-2 text-3xl">
            <Link to="https://www.x.com/" target="blank">
              <FaSquareXTwitter className="text-secondary hover:text-primary" />
            </Link>
            <Link to="https://www.instagram.com/" target="blank">
              <FaSquareInstagram className="text-secondary hover:text-primary" />
            </Link>
            <Link to="https://www.facebook.com/" target="blank">
              <FaSquareFacebook className="text-secondary hover:text-primary" />
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
