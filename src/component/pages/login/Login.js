import "./login.css";
import logo from "../../assets/user.svg";
import passwordlogo from "../../assets/password.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as signup } from "../../features/auth/authSlice";

import { useAuth } from "../../routeFiles/ProtectedRoute";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSucess, message } = useSelector(
    (state) => state.auth
  );
  const dataCheck = useAuth();

  // const dataCheck = useSelector((state) => state.auth);
  // const { email, username } = formValues;
  const validate = (x) => {
    console.log(x);
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (x.email.length < 12) {
      errors.email = "Please Enter the Valid Email Address more than 12";
    } else if (x.email.length > 30) {
      errors.email = "Please Enter the Valid Email Address";
    } else if (!regex.test(x.email)) {
      // console.log("email address");
      errors.email = "Please Enter the Valid Email Address";
    }
    if (x.password.length < 8) {
      errors.password = "Please Enter the Valid Password more than 8 Length";
    } else if (x.password.length > 15) {
      errors.password = "Please Enter the Valid password less than 15 Length";
    }
    return errors;
  };
  useEffect(() => {
    console.log(Object.keys(formErrors).length === 0);
    console.log(isSubmit);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(signup({ email, password }));
      // navigate("/home");
    }
  }, [formErrors]);
  useEffect(() => {
    console.log(dataCheck, "useAuth");
    if (isSucess && dataCheck) {
      console.log("iss success");
      navigate("/home");
    }
  }, [isSucess]);

  const SubmitBtn = (e) => {
    e.preventDefault();
    setFormErrors(validate({ email, password }));
    setIsSubmit(true);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="login-back ">
      <div className="w-40 bg-white top-50 start-50 translate-middle rounded-lg div-shadow  position-fixed">
        <div className="m-4 border">
          <div>
            <div className="text-center mt-4">
              <img src={require("../../assets/swaraj-logo2.png")} alt="#" />
            </div>
            <form className="form mt-5 m-3 " onSubmit={SubmitBtn}>
              <div className="form-row d-flex align-items-center">
                <span className="login-icon logo ">
                  <img src={logo} alt="#" />
                </span>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <p className="mx-2 text-danger">
                {!formErrors.email ? null : <div>{formErrors.email}</div>}
              </p>

              <div className="form-row mt-5  d-flex align-items-center">
                <span className="login-icon logo ">
                  <img src={passwordlogo} alt="" className="ml-2" />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="mx-2 text-danger">
                {!formErrors.password ? null : <div>{formErrors.password}</div>}
              </p>
              <div className="form-row mt-4 w-100 text-center ">
                <input
                  className="login-btn w-75 "
                  type="submit"
                  name="login"
                  value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
