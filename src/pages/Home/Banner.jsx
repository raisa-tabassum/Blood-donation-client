import { NavLink } from "react-router";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center md:bg-right bg-contain opacity-[0.38]"
        style={{ backgroundImage: `url(${bannerImg})` }}
      ></div>

      {/* text */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-40">
        <div className="flex justify-center">
          <div className="max-w-3xl text-center z-10">
            <h1 className="heading-font font-bold text-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Save Lives Through
              <span className="text-red-600"> Blood Donation</span>
            </h1>

            <p className="mt-6 text-neutral text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              BloodConnect brings donors and recipients together on one
              platform, helping people connect faster and save lives when every
              minute matters.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to="/register">
                <button className="custom-btn-primary w-40 md:w-44 h-12">
                  <span>Join As Donor</span>
                </button>
              </NavLink>
              <NavLink to="/search-donors">
                <button className="custom-btn-outline">
                  <span>Search Donors</span>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
