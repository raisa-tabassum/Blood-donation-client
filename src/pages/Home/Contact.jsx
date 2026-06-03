import React from "react";
import { FaPhoneAlt, FaEnvelopeOpenText } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Contact = () => {
  return (
    <section className="py-15 bg-[#FFF5F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="heading-font text-accent text-3xl md:text-5xl font-bold">
            Contact Us
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            We’re here to help you anytime. <br></br> Reach out for emergency
            blood needs or general inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-red-500 text-xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Phone Number
                </h4>
                <p className="text-gray-600">+88 961 876 54321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelopeOpenText className="text-red-500 text-xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Email Address
                </h4>
                <p className="text-gray-600">bloodconnect@support.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <HiOutlineLocationMarker className="text-red-500 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Location
                </h4>
                <p className="text-gray-600">
                  Available nationwide for emergency blood service
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-md mx-auto">
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered border-gray-200 w-full input-sm"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered border-gray-200 w-full"
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                className="textarea textarea-bordered border-gray-200 w-full"
              ></textarea>

              <button className="custom-btn w-full">
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
