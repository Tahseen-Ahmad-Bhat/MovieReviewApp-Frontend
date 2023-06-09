import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../api/auth";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid Name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };
  return { ok: true };
};

function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();

  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();

  const { isLoggedIn } = authInfo;

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    setBusy(true);
    const response = await createUser(userInfo);
    setBusy(false);
    if (response.error) return updateNotification("error", response.error);

    navigate("/auth/email-verification", {
      state: { user: response.user },
      replace: true,
    });
  };

  const { name, email, password } = userInfo;

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign Up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            label="Name"
            name="name"
            placeholder="jhon Bhat"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            name="email"
            placeholder="jhon@email.com"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            name="password"
            placeholder="*********"
            type="password"
          />
          <Submit value="Sign Up" busy={busy} />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/sign-in">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

export default Signup;
