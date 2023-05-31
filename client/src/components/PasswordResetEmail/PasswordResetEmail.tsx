import * as React from 'react'
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Title from '../Title/Title'
import { useAuthServiceContext } from '../../contexts/Authentication/AuthService'
import Button from '../Button/Button'
import { Navigate } from 'react-router-dom'
import { isNull } from 'lodash'

export interface PasswordResetEmailProps {}

const PasswordResetEmail = ({}: PasswordResetEmailProps) => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const { requestPasswordReset } = useAuthServiceContext()
    const [message, setMessage] = useState('')

    const validationSchema = () => {
        return Yup.object().shape({
            email: Yup.string().required('This field is required!')
        })
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
        event.currentTarget.style.outline = '1px solid #4285f4'
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
        event.currentTarget.style.outline = ''
    }

    const initialValues = {
        email: ''
    }

    const handleRequestPasswordReset = React.useCallback(
        async (formValue: {email: string}) => {
            setMessage('')
            requestPasswordReset(formValue.email).then(() => {
                setSuccessMessage('Please check your mailbox!')
            }).catch((error) => {
                const resMessage = (error.response &&
                    error.response.data &&
                    error.response.data.errorMessage) ||
                    error.message || error.toString()
                setMessage(resMessage)
            })
    }, []) 

    return (
        <div style={{ ...mainDivStyle }}>
            <div style={{ ...componentStyles }}>
                <Title text='Password reset' />
                <Formik initialValues={ initialValues }
                    validationSchema={ validationSchema() }
                    onSubmit={ handleRequestPasswordReset } >
                        <Form>
                            <div style={{ ...inputGroupStyle }} >
                                <label htmlFor="email">E-mail</label>
                                <Field name="email" type="email" style={{ ...inputStyle }}
                                    onFocus={ handleFocus } onBlur={ handleBlur } />
                                <div style={ errorMessageStyle }>
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <div style={{ ...inputGroupStyle }} >
                                <Button type="submit" text="Send" style={{ ...buttonStyle }} />
                            </div>
                            {message && <div style={{ ...errorMessageStyle }}>{message}</div>}
                            {successMessage && <div style={{ ...successMessageStyle }}>{successMessage}</div>}
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

export default PasswordResetEmail
