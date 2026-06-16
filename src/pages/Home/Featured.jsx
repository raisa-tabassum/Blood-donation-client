import React from "react";
import { HiOutlineBolt } from "react-icons/hi2";
import { MdOutlineEmergency } from "react-icons/md";
import { RiVerifiedBadgeLine } from "react-icons/ri";

const Featured = () => {
  const features = [
    {
      title: "Emergency Donation",
      description:
        "Quickly find blood donors during emergencies and connect with people who are ready to help when every second counts.",
      icon: <MdOutlineEmergency className="text-primary" />,
    },
    {
      title: "Verified Donors",
      description:
        "Browse verified donor profiles with accurate information to ensure safe and trustworthy blood donation connections.",
      icon: <RiVerifiedBadgeLine className="text-primary" />,
    },
    {
      title: "Fast Response",
      description:
        "Get notified instantly and receive faster responses from nearby donors to meet urgent blood requests.",
      icon: <HiOutlineBolt className="text-primary" />,
    },
  ];
  return (
    <div className="my-8 lg:my-12 max-w-7xl mx-auto">
      <h2 className="heading-font text-accent text-3xl md:text-5xl font-bold px-2 text-center">
        Why Choose <span className="text-primary">Blood</span>Connect?
      </h2>

      <p className="mt-5 text-center max-w-2xl px-2 mx-auto text-neutral">
        We make blood donation faster, safer, and more reliable by connecting
        donors and recipients when it matters most.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>

            <h3 className="heading-font text-xl md:text-2xl font-semibold text-accent">
              {feature.title}
            </h3>

            <p className="mt-3 text-neutral">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
