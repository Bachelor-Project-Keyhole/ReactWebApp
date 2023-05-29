import * as React from 'react'
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Title from '../Title/Title'
import { useAuthServiceContext } from '../../contexts/Authentication/AuthService'
import Button from '../Button/Button'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export interface PasswordResetProps {}

const PasswordReset = ({}: PasswordResetProps) => {
    const token = useParams()
    const [redirect, setRedirect] = useState<string | null>(null)
    const { resetPassword } = useAuthServiceContext()
    const [message, setMessage] = useState('')

    const validationSchema = () => {
        return Yup.object().shape({
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
        })
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
        event.currentTarget.style.outline = '1px solid #4285f4'
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
        event.currentTarget.style.outline = ''
    }

    const initialValues = {
        password: '',
        passwordRepeat: ''
    }

    const handleResetPassword = React.useCallback(async (
        formValue: {password: string, passwordRepeat: string}) => {
            if(token.token)
            resetPassword(formValue.password, token.token).then(() => {
                setRedirect('/login')
            }).catch((error) => {
                const resMessage = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message || error.toString()
                setMessage(resMessage)
            })
    }, [])

    if(redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div style={{ ...mainDivStyle }}>
            <div style={{ ...componentStyles }}>
                <Title text='New password' />
                <Formik initialValues={ initialValues }
                    validationSchema={ validationSchema() }
                    onSubmit={ handleResetPassword} >
                        <Form>
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
                            <div style={inputGroupStyle}>
                                <Button type="submit" text="Reset" style={buttonStyle} />
                            </div>
                            {message && <div style={errorMessageStyle}>{message}</div>}
                        </Form>
                </Formik>
            </div>
        </div>
    )
}

const mainDivStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)'
}

const componentStyles: React.CSSProperties = {
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

const buttonStyle: React.CSSProperties = {
    borderRadius: 5,
    backgroundColor: '#0275d8',
    border: '2px solid #0275d8',
    color: 'white',
    width: '30%'
}

export default PasswordReset
