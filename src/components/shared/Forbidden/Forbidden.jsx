// import Lottie from "react-lottie";
// import forbiddenAnimation from "../../../assets/json/forbidden.json";
import { Link } from "react-router";
const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {/* <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: forbiddenAnimation,
        }}
        height={200}
        width={200}
      ></Lottie> */}
      <h1 className="text-3xl font-bold text-primary">
        You Are Forbidden to Access This Page
      </h1>
      <p className="text-lg text-gray-600">
        Please contact the administrator if you believe this is an error.
      </p>
      <div className="space-x-3">
        <Link to="/" className="btn custom-btn-outline text-black">
          {" "}
          Go to Home
        </Link>
        <Link className="btn custom-btn-primary" to="/dashboard">
          {" "}
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;