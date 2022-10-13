import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="WelcomePage">
        <img
          className="WelcomePage__WelcomeImg"
          src="welcome.svg"
          alt="welcome"
        />
        <div className="WelcomePage__Title__Wrapper">
          <div className="WelcomePage__Title">ReCards</div>
        </div>
        <div className="Blank"></div>
        <div className="InfoBlock">
          <div className="InfoBlock__Wrapper">
            <div className="InfoBlock__Title">Let's Start!</div>
            <div className="InfoBlock__Description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              sit? Dignissimos illo autem eum consequatur officiis in iste
              perspiciatis doloribus. Quas laudantium eos aliquid quidem!
            </div>
            <div className="InfoBlock__Buttons">
              <button
                className="InfoBlock__Buttons__Register"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
              <button
                className="InfoBlock__Buttons__Login"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
