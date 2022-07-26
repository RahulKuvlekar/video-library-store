import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ADD_TOAST, GET_SIGNUP, INFO } from "../../Constant/constant";
import axios from "axios";
import "./Auth.css";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";

const Signup = () => {
  const INITIAL_VAL = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { dispatchToast } = useToastContext();
  const [formValue, setFormValue] = useState(INITIAL_VAL);
  const [formError, setFormError] = useState(INITIAL_VAL);
  const [isSubmit, setIsSubmit] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSubmit(false);
  };
  const resetHandler = (event) => {
    setFormValue(INITIAL_VAL);
    setFormError({});
    setIsSubmit(false);
    setSignupError(null);
  };

  const validate = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!firstName) error.firstName = "Firstname is required*";

    if (!lastName) error.lastName = "Lastname is required*";

    if (!email) error.email = "Email Id is required*";
    else if (!regex.test(email)) error.email = "Enter Valid Email-Id";

    if (!password) error.password = "Password is required*";
    else if (password.length < 7)
      error.password = "Password length should be greater than 7";

    if (!confirmPassword)
      error.confirmPassword = "Confirm password is required*";
    else if (password !== confirmPassword)
      error.confirmPassword = "Password doesn't match";

    return error;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  };

  const focusHandler = (event) => {
    setFormError({});
    setIsSubmit(false);
    setSignupError(null);
  };

  const SignupService = async (body) => {
    try {
      const response = await axios.post(GET_SIGNUP, body);
      const { status } = await response;

      if (status === 201) {
        dispatchToast({
          type: ADD_TOAST,
          payload: createToast(
            INFO,
            "New Account has been created Succesfully 🎉"
          ),
        });
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      setSignupError(error.response.data.errors[0]);
    }
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formError).length === 0) {
      SignupService(JSON.stringify(formValue));
      resetHandler();
    }
    // eslint-disable-next-line
  }, [isSubmit]);

  return (
    <div className="signup">
      <form action="" className="form form-login" onSubmit={submitHandler}>
        <div className="input-group">
          <h1 className="text-grey-dk">SignUp Form</h1>
        </div>
        <div className={`input-group ${formError.firstName && "input-error"}`}>
          <label className="input-label">FirstName *</label>
          <input
            type="text"
            placeholder="Enter your Firstname"
            name="firstName"
            value={formValue?.firstName}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.firstName && (
            <p className="input-error-message text-sm">{formError.firstName}</p>
          )}
        </div>
        <div className={`input-group ${formError.lastName && "input-error"}`}>
          <label className="input-label">LastName *</label>
          <input
            type="text"
            placeholder="Enter your Lastname"
            name="lastName"
            value={formValue?.lastName}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.lastName && (
            <p className="input-error-message text-sm">{formError.lastName} </p>
          )}
        </div>
        <div className={`input-group ${formError.email && "input-error"}`}>
          <label className="input-label">Email Id *</label>
          <input
            type="text"
            placeholder="Enter Email Id"
            name="email"
            value={formValue?.email}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.email && (
            <p className="input-error-message text-sm">{formError.email} </p>
          )}
        </div>

        <div className={`input-group ${formError.password && "input-error"}`}>
          <label className="input-label">Password *</label>
          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
            value={formValue?.password}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.password && (
            <p className="input-error-message text-sm">{formError.password}</p>
          )}
        </div>

        <div
          className={`input-group ${
            formError.confirmPassword && "input-error"
          }`}
        >
          <label className="input-label">Confirm Password *</label>
          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            name="confirmPassword"
            value={formValue?.confirmPassword}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.confirmPassword && (
            <p className="input-error-message text-sm">
              {formError.confirmPassword}
            </p>
          )}
        </div>

        {signupError && (
          <div className={`input-group ${signupError && "input-error"}`}>
            <p className="input-error-message text-md">{signupError}</p>
          </div>
        )}

        <div className="input-group h4 text-grey-dk">
          <p>
            Already have account ?
            <Link to="/login" className="btn-link link-primary">
              Login ?
            </Link>
          </p>
        </div>
        <button type="submit" className="btn btn-success">
          Sign In
        </button>
        <button type="reset" className="btn btn-success" onClick={resetHandler}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Signup;
