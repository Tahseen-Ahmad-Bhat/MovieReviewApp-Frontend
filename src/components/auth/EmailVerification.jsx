import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerificationToken, verifyUserEmail } from "../../api/auth";

import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useAuth, useNotification } from "../../hooks";

const OTP_LENGTH = 6;
let currentIndex;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();

  const { updateNotification } = useNotification();
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputFeild = (index) => {
    const prevIndex = index > 0 ? index - 1 : 0;
    setActiveOtpIndex(prevIndex);
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    console.log(value);

    const newOtp = [...otp];
    newOtp[currentIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputFeild(currentIndex);
    else focusNextInputField(currentIndex);

    setOtp([...newOtp]);
  };

  const handleOTPResend = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  const handleKeyDown = (e, index) => {
    const { key } = e;
    currentIndex = index;

    console.log(index, "in keyDown");

    if (key === "Backspace") {
      focusPrevInputFeild(currentIndex);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification("error", "Invalid OTP");

    // submit OTP
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) return navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn, isVerified]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " m-3"}>
          <div>
            <Title>Please enter the OTP to verify your email</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle text-sm">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-between items-center md:space-x-4 space-x-2">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index]}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="md:w-12 w-10 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary  rounded bg-transparent outline-none dark:text-white text-primary text-center font-semibold text-xl "
                />
              );
            })}
          </div>

          <div>
            <Submit value="Verify Account" />
            <button
              type="button"
              onClick={handleOTPResend}
              className="dark:text-white text-blue-500 md:font-semibold hover:underline mt-2"
            >
              I don't have OTP
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
