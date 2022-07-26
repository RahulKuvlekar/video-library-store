import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../Hooks/useAuthContext";
import "./Auth.css";
import {
  GET_LOGIN,
  authFeatures,
  ADD_TOAST,
  SUCCESS,
} from "../../Constant/constant";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";

const Login = () => {
  const INITIAL_VALUE = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(INITIAL_VALUE);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { SET_AUTH } = authFeatures;

  const { dispatchAuth } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatchToast } = useToastContext();

  const FROM = location?.state?.from?.pathname || "/";

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSubmit(false);
  };

  const validate = ({ email, password }) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) error.email = "Email Id is required*";
    else if (!regex.test(email)) error.email = "Enter Valid Email-Id";

    if (!password) error.password = "Password is required*";

    return error;
  };

  function submitHandler(event) {
    event.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  }

  const focusHandler = () => {
    setFormError({});
    setIsSubmit(false);
    setLoginError(null);
  };

  const resetHandler = () => {
    setFormValue(INITIAL_VALUE);
    setFormError({});
    setIsSubmit(false);
    setLoginError(null);
  };

  const setDummyCredentials = () => {
    resetHandler();
    setFormValue({
      email: "guestuser@gmail.com",
      password: "guestuser123",
    });
  };

  const LoginService = async (body) => {
    try {
      const { data, status } = await axios.post(GET_LOGIN, body);

      if (status === 200) {
        const { foundUser, encodedToken } = data;

        const userInfo = {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
        };
        const payload = {
          isAuthenticated: true,
          token: encodedToken,
          userInfo: userInfo,
        };

        dispatchAuth({
          type: SET_AUTH,
          payload: payload,
        });

        dispatchToast({
          type: ADD_TOAST,
          payload: createToast(
            SUCCESS,
            `${userInfo.firstName} ${userInfo.lastName} login successfully 🎉`
          ),
        });

        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        navigate(FROM, { replace: true });
      }
    } catch (error) {
      setLoginError(error.response.data.errors[0]);
    }
    return;
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formError).length === 0) {
      LoginService(JSON.stringify(formValue));
      resetHandler();
    }
    // eslint-disable-next-line
  }, [isSubmit]);

  return (
    <div className="login">
      <form action="" className="form form-login" onSubmit={submitHandler}>
        <div className="input-group">
          <h1 className="text-grey-dk">Login Form</h1>
        </div>
        <div className={`input-group ${formError.email && "input-error"}`}>
          <label className="input-label">Email Id *</label>
          <input
            placeholder="Enter Email Id"
            autoComplete="off"
            name="email"
            value={formValue.email}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.email && (
            <p className="input-error-message text-sm">{formError.email}</p>
          )}
        </div>

        <div className={`input-group ${formError.password && "input-error"}`}>
          <label className="input-label">Password *</label>
          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
            value={formValue.password}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.password && (
            <p className="input-error-message text-sm">{formError.password}</p>
          )}
        </div>

        {loginError && (
          <div className={`input-group ${loginError && "input-error"}`}>
            <p className="input-error-message text-md">{loginError}</p>
          </div>
        )}

        <div className="input-group h4 text-grey-dk">
          <p>
            Don't have account ?
            <Link to="/signup" className="btn-link link-primary text-md">
              SignUp ?
            </Link>
            or use
            <button
              type="button"
              onClick={setDummyCredentials}
              className="btn-link link-primary text-md"
            >
              DUMMY CREDENTIALS ?
            </button>
            {/* or
            <Link to="/forgotpassword" className="btn-link link-primary text-md">
              Forgot Password ?
            </Link> */}
          </p>
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
        <button type="reset" className="btn btn-success" onClick={resetHandler}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Login;
