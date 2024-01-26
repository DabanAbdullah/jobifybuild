import { FormRow, Logo, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import React, { useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const Register = () => {
  const navigation = useNavigation();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   lastName: "",
  //   location: "",
  //   email: "",
  //   password: "",
  //   confirmpassword: "",
  // });

  const [passwordError, setPasswordError] = useState("");

  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(formData.confirmpassword);
  //   // Client-side validation
  //   if (formData.password !== formData.confirmpassword) {
  //     setPasswordError("Passwords do not match");

  //     return;
  //   }
  //   // Reset password error if validation passes
  //   setPasswordError("");

  //   // Continue with your registration logic here
  // };
  //onSubmit={handleSubmit}
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow
          type="text"
          placeholder="First Name"
          LabelText="First Name"
          name="name"
          //  value={formData.name}
          //  onChange={handleInputChange}
        ></FormRow>

        <FormRow
          type="text"
          placeholder="Last Name"
          LabelText="Last Name"
          name="lastName"
          //  value={formData.lastName}
          //  onChange={handleInputChange}
        ></FormRow>

        <FormRow
          type="text"
          placeholder="Location"
          LabelText="Location"
          name="location"
          //  value={formData.location}
          //  onChange={handleInputChange}
        ></FormRow>

        <FormRow
          type="email"
          placeholder="someone@example.com"
          LabelText="Email"
          name="email"
          //  value={formData.email}
          //  onChange={handleInputChange}
        ></FormRow>

        <FormRow
          type="password"
          name="password"
          // value={formData.password}
          // onChange={handleInputChange}
          LabelText="Password"
          placeholder="type your Password"
        />

        {/* <FormRow
          type="password"
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleInputChange}
          LabelText="Confirm Password"
          placeholder="Confirm your Password"
        /> */}

        {passwordError && <p className="error-message">{passwordError}</p>}

        <SubmitBtn
          formBtn
          name={"Register"}
          action={"Registering user..."}
        ></SubmitBtn>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
