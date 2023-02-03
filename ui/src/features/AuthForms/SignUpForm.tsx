import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import InputField from '../../components/Input/InputField';
import Icon from '../../components/Icon/Icon';
import InputPasswordField from '../../components/Input/InputPasswordField';
import { Button } from '../../components/Button/Button';
import { AuthFormComponent } from '../../types/interfaces/AuthFormComponent';
import { useDispatch } from 'react-redux';
import { signUpLoadAction } from '../../redux/actions/SignUpActions';
import { signUpSchema } from '../../utils/validation/signUpSchema';
import { SwitchBox } from '../../components/SwitchBox/SwitchBox';
import { getSignUpSelector } from '../../redux/selectors/authSelector';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const switchText = {
    before: 'Employer',
    after: 'Applicant',
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();
  const { isFetching, isError, errorMessage } = useSelector(getSignUpSelector);
  useEffect(() => {
    if (isFetching && isSubmit && !isError) {
      history.push('/sign-in');
    }
  }, [isSubmit, isFetching, isError, errorMessage, history]);
  const initialValues: AuthFormComponent = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validationSchema: signUpSchema,
    onSubmit(values: AuthFormComponent) {
      dispatch(
        signUpLoadAction({
          ...values,
          role: isToggled ? switchText.before : switchText.after,
        }),
      );
      setIsSubmit(true);
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Enter an email"
          name="email"
          onChange={handleChange}
          value={values.email}
          errors={errors.email}
        >
          <Icon iconName="icon-mail" />
        </InputField>
        <InputField
          type="text"
          placeholder="First name"
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          errors={errors.firstName}
        ></InputField>
        <InputField
          type="text"
          placeholder="Last name"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          errors={errors.lastName}
        ></InputField>
        <div className="auth__inner-info">
          <InputPasswordField
            type="password"
            placeholder="Enter a password"
            name="password"
            onChange={handleChange}
            value={values.password}
            errors={errors.password}
          />
          <InputPasswordField
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            errors={errors.confirmPassword}
          />
          <SwitchBox
            isToggled={isToggled}
            setIsToggled={setIsToggled}
            switch={{ before: 'Applicant', after: 'Employer' }}
          />
        </div>
        <div className="auth__inner-buttons">
          <Button type="submit">Sign up</Button>
          <span className="auth__inner-buttons--request">
            or just <Link to="/sign-in">Sign in</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
