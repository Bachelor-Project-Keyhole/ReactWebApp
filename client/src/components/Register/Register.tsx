import * as React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthServiceContext } from '../../contexts/Authentication/AuthService';
import Button from '../Button';
import Title from '../Title';
import { useParams, Navigate } from 'react-router-dom';

type RegisterProps = {
  isNewCompany: boolean;
};

type FormValuesCompany = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  companyName: string;
};

type FormValuesUser = {
  username: string;
  password: string;
  passwordRepeat: string;
};

const Register = ({ isNewCompany }: RegisterProps): JSX.Element => {
  const token = useParams()

  const [successful, setSuccessful] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const { registerCompany, registerUser } = useAuthServiceContext()

  const initialValuesCompany: FormValuesCompany = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    companyName: '',
  };

  const initialValuesUser: FormValuesUser = {
    username: '',
    password: '',
    passwordRepeat: '',
  };

  const validationSchemaCompany = Yup.object().shape({
    username: Yup.string()
      .test(
        'len',
        'The username must be between 2 and 20 characters!',
        (val: any) =>
          val && val.toString().length >= 2 && val.toString().length <= 20
      )
      .required('This field is required!'),
    email: Yup.string().email('This is not a valid email.').required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required('This field is required!'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords do not match!')
      .required('Repeat Password is required!'),
    companyName: Yup.string().required('This field is required!'),
  });

  const validationSchemaUser = Yup.object().shape({
    username: Yup.string()
      .test(
        'len',
        'The username must be between 2 and 20 characters!',
        (val: any) =>
          val && val.toString().length >= 2 && val.toString().length <= 20
      )
      .required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required('This field is required!'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords do not match!')
      .required('Repeat Password is required!'),
  });

  const handleRegisterCompany = React.useCallback((formValue: FormValuesCompany) => {
    const { username, email, password, companyName } = formValue;

    setMessage('');
    setSuccessful(false);

    registerCompany(username, email, password, companyName).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.errorMessage) ||
          error.message ||
          error.toString();

        setSuccessful(false);
        setMessage(resMessage);
        console.log(error.response.errorMessage);
      }
    )
  }, [])

  const handleRegisterUser = React.useCallback( async(formValue: FormValuesUser) => {
    const { username, password } = formValue;
    setMessage('');
    setSuccessful(false);

    if(token.token)
    registerUser(username, password, token.token).then(
      (response) => {
        console.log(response.data.message)
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.errorMessage) ||
          error.message ||
          error.toString();

        setSuccessful(false);
        setMessage(resMessage);
      }
    )
  }, [])

  const handleFocus = (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
    event.currentTarget.style.outline = '1px solid #4285f4'
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
    event.currentTarget.style.outline = ''
  }

  if (successful) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ ...mainDivStyle }}>
      <div style={{ ...componentStyle }}>
        {isNewCompany ? (
          <>
            <Title text="Sign up company" />
            <Formik
              initialValues={initialValuesCompany}
              validationSchema={validationSchemaCompany}
              onSubmit={handleRegisterCompany}
            >
              <Form>
                {!successful && (
                  <div>
                    <div style={{ ...inputGroupStyle }}>
                      <label htmlFor="companyName">Organization name</label>
                      <Field name="companyName" type="text" style={{ ...inputStyle }}
                        onFocus={ handleFocus } onBlur={ handleBlur }  />
                      <div style={{ ...errorMessageStyle}}>
                        <ErrorMessage name="companyName" />
                      </div>
                    </div>
                    <div style={{ ...inputGroupStyle }}>
                      <label htmlFor="username">Owner's name</label>
                      <Field name="username" type="text" style={{ ...inputStyle }}
                        onFocus={ handleFocus } onBlur={ handleBlur }  />
                      <div style={{ ...errorMessageStyle }}>
                        <ErrorMessage name="username" />
                      </div>
                    </div>
                    <div style={{ ...inputGroupStyle }}>
                      <label htmlFor="email">E-mail</label>
                      <Field name="email" type="email" style={{ ...inputStyle }}
                        onFocus={ handleFocus } onBlur={ handleBlur }  />
                      <div style={{ ...errorMessageStyle }}>
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div style={{ ...inputGroupStyle }}>
                      <label htmlFor="password">Password</label>
                      <Field name="password" type="password" style={{ ...inputStyle }}
                        onFocus={ handleFocus } onBlur={ handleBlur }  />
                      <div style={{ ...errorMessageStyle }}>
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <div style={{ ...inputGroupStyle }}>
                      <label htmlFor="passwordRepeat">Repeat password</label>
                      <Field name="passwordRepeat" type="password" style={{ ...inputStyle }}
                        onFocus={ handleFocus } onBlur={ handleBlur }  />
                      <div style={{ ...errorMessageStyle }}>
                        <ErrorMessage name="passwordRepeat" />
                      </div>
                    </div>
                    <div>
                      <div style={{ ...inputGroupStyle }}>
                        <Button text="Sign up" type="submit" style={{ ...buttonStyle }} />
                      </div>
                    </div>
                  </div>
                )}

                {message && (
                  <div style={{ ...inputGroupStyle }}>
                    <div style={successful ? { ...successMessageStyle } : { ...errorMessageStyle }} role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </>
        ) : (
          <>
            <Title text="Sign up user" />
            <Formik
              initialValues={initialValuesUser}
              validationSchema={validationSchemaUser}
              onSubmit={handleRegisterUser}
            >
              <Form>
                {!successful && (
                  <div>
                    <div style={{ ...inputGroupStyle }}>
                      <label htmlFor="username">Name</label>
                      <Field name="username" type="text" style={{ ...inputStyle }}
                        onFocus={ handleFocus } onBlur={ handleBlur } />
                      <div style={{ ...errorMessageStyle }}>
                        <ErrorMessage name="username" />
                      </div>
                    </div>
                    <div style={{ ...inputGroupStyle }}>
                      <label htmlFor="password">Password</label>
                      <Field name="password" type="password" style={{ ...inputStyle }}
                        onFocus={ handleFocus } onBlur={ handleBlur } />
                      <div style={{ ...errorMessageStyle }}>
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <div style={{ ...inputGroupStyle }}>
                      <label htmlFor="passwordRepeat">Repeat password</label>
                      <Field name="passwordRepeat" type="password" style={{ ...inputStyle }}
                        onFocus={ handleFocus } onBlur={ handleBlur } />
                      <div style={{...errorMessageStyle}}>
                        <ErrorMessage name="passwordRepeat" />
                      </div>
                    </div>
                    <div style={{ ...inputGroupStyle }}>
                      <Button text="Sign up" type="submit" style={{ ...buttonStyle }} />
                    </div>
                  </div>
                )}

                {message && (
                    <div style={{ ...inputGroupStyle }}>
                      <div style={successful ? { ...successMessageStyle } : { ...errorMessageStyle }} role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};

export const mainDivStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)'
}

export const componentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'white',
    alignItems: 'center',
    width: '40vh',
    height: '50vh',
    borderRadius: 25,
    border: '3px solid #D3D3D3',
    paddingBottom: '1vh',
    paddingTop: '2vh'
}

const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
}

const inputStyle: React.CSSProperties = {
    borderRadius: 5,
    border: '1px solid #D3D3D3',
    height: '2vh',
    width: '20vh',
}

const errorMessageStyle: React.CSSProperties = {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    border: '1px #f5c6cb',
    width: '20vh'
}

const successMessageStyle: React.CSSProperties = {
    color: '#155724',
    backgroundColor: '#d4edda',
    borderRadius: 25,
    borderColor: '#c3e6cb'
}

const buttonStyle: React.CSSProperties = {
    borderRadius: 5,
    backgroundColor: '#0275d8',
    border: '2px solid #0275d8',
    color: 'white',
    width: '30%'
}

export default Register