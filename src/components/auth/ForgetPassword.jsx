import React, { useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { isValidEmail } from "../../utils/helper";
import { useNotification } from "../../hooks";
import { forgetPassword } from "../../api/auth";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const { updateNotification } = useNotification();

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email))
      return updateNotification("error", "Invalid Email!");

    const { error, message } = await forgetPassword(email);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Please Enter Your Email</Title>
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            name="email"
            placeholder="jhon@email.com"
          />

          <Submit value="Send Link" />

          <div className="flex justify-between">
            <CustomLink to="/auth/sign-in">Sign In</CustomLink>
            <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
