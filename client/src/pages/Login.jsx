import {
  Link,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.password.length < 3) {
    errors.msg = "password is too short";
    return errors;
  }
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    //     toast.error(error?.response?.data?.msg);
    //  return error;
    errors.msg = error?.response?.data?.msg;
    return errors;
  }
};

export const Login = () => {
  const errors = useActionData();
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "gnt573@CS",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow
          type="text"
          placeholder="Email or Username"
          LabelText="Email"
          name="email"
        />

        <FormRow
          type="password"
          placeholder="type your password here"
          LabelText="Password"
          name="password"
        />

        <SubmitBtn formBtn name={"Log In"} action={"Signing In..."}></SubmitBtn>
        <button type="submit" className="btn btn-block" onClick={loginDemoUser}>
          Explorer the App
        </button>
        <p>
          Dont have an account yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
      <div className="divstyle"></div>
    </Wrapper>
  );
};

export default Login;
