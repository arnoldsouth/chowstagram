import { useState } from 'react';

import FlexBetween from 'components/FlexBetween';
// form library
import { Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from 'state';
// validation library
import * as yup from 'yup';

import { EditOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Schemas set up yup validation
// create schemas, the `yup` validation schemas, determine how the form library is going to be saving this information. passing in all values for our schema
// validate user's inputs, if it's not the intended input, user receives an error
const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  picture: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

// These set up initial values
const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  picture: '',
  location: '',
  occupation: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = () => {
  // display a different form dependingon this Form's state
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:37.5rem)');
  // when using boolean, try to keep variable beginning with 'is_'
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const register = async (values, onSubmitProps) => {
    // this allows us to send form information with image
    // because we have an image, this is one way to send the image through to the request body
    const formData = new FormData();
    // loop through every key value in the `values` object, and append it to `formData`. will cycle through all the values and add it to formData
    for (let value in values) {
      formData.append(value, values[value]);
    }

    formData.append('picturePath', values.picture.name);

    // send this `formData` to this particular API call below
    const savedUserResponse = await fetch(
      'http://localhost:3001/auth/register',
      {
        method: 'POST',
        body: formData,
      }
    );

    // invoke the savedUserResponse as parseable form, aka json
    const savedUser = await savedUserResponse.json();

    // Formik resets the form once it's been submitted using `onSubmitProps`
    onSubmitProps.resetForm();

    // if successful in getting the user, we set page type to 'login', otherwise we aren't going to renavigate
    if (savedUser) {
      setPageType('login');
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();

    // if successful in loggin in, we reset the form
    onSubmitProps.resetForm();

    // once the user is successfully authenticated, we dispatch and setLogin user and login token to loggedIn.user and loggedIn.token, which is coming from Redux state. we are setting the user and the token inside our state inside our store
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/home');
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // if at isLogin page, we want to run a function that will call our backend that we've created for logging in
    if (isLogin) await login(values, onSubmitProps);

    // if at isRegister page, we want to run a function that will call our backend that we've created for registering an account
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      // 1) Formik is grabbing the handleFormSubmit
      onSubmit={handleFormSubmit}
      // if we're on the login page, show the initial values for login, if not, show the initial values for register
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {/* 2) Formik is grabbing the handleFormSubmit, and passing it into our Formik, so we can pass it to our onSubmit function  */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        // 3) so we can pass it to our onSubmit function

        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="1.875rem"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            // smaller screens, this Box field will have span of 4
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius=".3125rem"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    // only one file can be uploaded
                    multiple={false}
                    // need to set dropzone manually for setFieldValue
                    onDrop={(acceptedFiles) =>
                      setFieldValue('picture', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`.125rem dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Upload profile photo</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* SECTION FOR REGISTER AND LOGIN */}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              // if has been touched, or there is an error, show the error for this particular text field
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              // larger screens, this text field will have span of 4
              sx={{ gridColumn: 'span 4' }}
            />

            <TextField
              label="Password"
              // hidden password
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              // if has been touched, or there is an error, show the error for this particular text field
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              // larger screens, this text field will have span of 4
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          {/* REGISTER AND LOGIN BUTTONS */}

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: [palette.primary.main] },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>

            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login');
                // clear out inputs when switching between register and login forms
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? `Don't have an account? Sign up here!`
                : `Already have an account? Login here`}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
