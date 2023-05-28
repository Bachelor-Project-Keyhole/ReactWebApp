import * as React from 'react'
import { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuthServiceContext } from '../../contexts/Authentication/AuthService'
import UserService from '../../contexts/Authentication/UserService'
import { Navigate } from 'react-router-dom'
import Button from '../Button'
import Title from '../Title'

export interface LoginProps {}

type State = {
  redirect: string | null;
  email: string;
  password: string;
  loading: boolean;
  message: string;
  inputBorder: string;
}

const Login = ({ ...props }: LoginProps): any => {
  const [redirect, setRedirect] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [inputBorder, setInputBorder] = useState('')
  const { login } = useAuthServiceContext()

  useEffect(() => {
    const currentUser = UserService.getCurrentUser()
  }, [])

  useEffect(() => {
    return () => {
      window.location.reload()
    }
  }, [])

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string().required('This field is required!'),
      password: Yup.string().required('This field is required!'),
    })
  }

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue

    setMessage('')
    setLoading(true)

    login(email, password)
      .then(() => {
        setRedirect('/profile');
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
        setMessage(resMessage)
      })
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  const initialValues = {
    email: '',
    password: '',
  }

  return (
    <div style={mainDivStyle}>
      <div style={componentStyles}>
        <Title text="Sign in" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema()}
          onSubmit={handleLogin}
        >
          <Form>
            <div style={inputGroupStyle}>
              <label htmlFor="email">E-mail</label>
              <Field name="email" type="email" style={inputStyle} />
              <div style={errorMessageStyle}>
                <ErrorMessage name="email" />
              </div>
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" style={inputStyle} />
              <div style={errorMessageStyle}>
                <ErrorMessage name="password" />
              </div>
            </div>
            <div style={inputGroupStyle}>
              <Button type="submit" text="Sign in" style={buttonStyle} />
            </div>
            {message && <div style={errorMessageStyle}>{message}</div>}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

const componentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40vh',
    height: '50vh',
    borderRadius: 25,
    border: '3px solid #D3D3D3',
    paddingBottom: '1vh',
    paddingTop: '2vh',
  }
  
const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
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
  borderRadius: 25,
  borderColor: '#f5c6cb',
}

const mainDivStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

const buttonStyle: React.CSSProperties = {
  borderRadius: 5,
  backgroundColor: '#0275d8',
  border: '2px solid #0275d8',
  color: 'white',
}

export default Login
