import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="content text-center text-dark landing-page">
      <div className="content">
        <h3 className="m-5 lh-base ">
          Welcome to our Bulk Email Project, your ultimate solution for
          efficiently reaching out to multiple recipients simultaneously! With
          our cutting-edge platform, sending personalized emails to a large
          audience has never been easier. Whether you're a business looking to
          engage customers, a marketer striving for outreach, or an organization
          aiming to communicate with members, our platform caters to all your
          bulk emailing needs.
        </h3>

        <h3 className="m-5 lh-base">
          Join countless satisfied users who have revolutionized their email
          outreach with our innovative platform. Experience the power of bulk
          emailing like never before and unlock new possibilities for connecting
          with your audience. Get started today and elevate your communication
          strategy to new heights with our Bulk Email Project.
        </h3>
        {userInfo ? (
          <Link to="/send-email" className="homePageBtn">
            Send Mail <FaPaperPlane className="ms-2" />
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-dark btn-lg btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn-dark btn-lg btn ms-3">register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
