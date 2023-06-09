import React, { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useAuth, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };
  return { ok: true };
};

function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();

  const { isPending, isLoggedIn } = authInfo;

  const handleChange = (e) => {
    // console.log(e.target);
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    handleLogin(userInfo.email, userInfo.password);
  };

  // useEffect(() => {
  //   if (isLoggedIn) navigate("/");
  // }, [isLoggedIn]);

  return (
    <FormContainer test="testing">
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign in</Title>
          <FormInput
            label="Email"
            name="email"
            placeholder="jhon@email.com"
            value={userInfo.email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            name="password"
            placeholder="*********"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          <Submit value="Sign In" busy={isPending} />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

export default Signin;
