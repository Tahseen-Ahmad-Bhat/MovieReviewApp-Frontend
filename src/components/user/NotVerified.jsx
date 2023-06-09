import React from "react";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import Container from "../Container";

export default function NotVerified() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate("auth/email-verification", { state: { user: authInfo.profile } });
  };

  return (
    <div>
      {isLoggedIn && !isVerified ? (
        <p className=" text-lg text-center bg-blue-50 p-2">
          It looks like you haven't verified your account{" "}
          <button
            onClick={navigateToVerification}
            className=" text-blue-500 font-semibold hover:underline"
          >
            Click here to verify your account
          </button>
        </p>
      ) : null}
    </div>
  );
}
