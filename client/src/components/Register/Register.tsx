import { Component } from 'react'
import * as React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import AuthService from '../../contexts/Authentication/AuthService'
import Button from '../Button'
import Title from '../Title'
import { Link } from 'react-router-dom'

type Props = {
    isNewCompany: boolean
}

type State = {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string,
    successful: boolean,
    message: string,
    isNewCompany: boolean
}

export const mainDivStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
}

export const componentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    color: 'white'
}

export default class Register extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.handleRegisterCompany = this.handleRegisterCompany.bind(this)
        this.handleRegisterUser = this.handleRegisterUser.bind(this)

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            successful: false,
            message: '',
            isNewCompany: props.isNewCompany
        }
    }

    validationSchemaCompany() {
        return Yup.object().shape({
            username: Yup.string().test(
                'len',
                'The username must be between 2 and 20 characters!',
                (val: any) => val &&
                    val.toString().length >= 2 &&
                    val.toString().length <= 20
            ).required('This field is required!'),
            email: Yup.string()
                .email('This is not a valid email.')
                .required('This field is required!'),
            password: Yup.string()
                .test(
                    'len',
                    'The password must be between 6 and 40 characters.',
                    (val: any) =>
                        val &&
                        val.toString().length >= 6 &&
                        val.toString().length <= 40
                )
                .required('This field is required!'),
            passwordRepeat: Yup.string().oneOf(
                [Yup.ref('password'), ''], 'Passwords do not match!').required(
                    'Repeat Password is required!'),
            companyName: Yup.string().required('This field is required!')
        })
    }

    validationSchemaUser() {
        return Yup.object().shape({
            username: Yup.string().test(
                'len',
                'The username must be between 2 and 20 characters!',
                (val: any) => val &&
                    val.toString().length >= 2 &&
                    val.toString().length <= 20
            ).required('This field is required!'),
            password: Yup.string()
                .test(
                    'len',
                    'The password must be between 6 and 40 characters.',
                    (val: any) =>
                        val &&
                        val.toString().length >= 6 &&
                        val.toString().length <= 40
                )
                .required('This field is required!'),
            passwordRepeat: Yup.string().oneOf(
                [Yup.ref('password'), ''], 'Passwords do not match!').required(
                    'Repeat Password is required!'),
        })
    }

    handleRegisterCompany(formValue: { username: string; email: string; password: string, companyName: string }) {
        const { username, email, password, companyName } = formValue

        this.setState({
            message: '',
            successful: false
        })

        AuthService.registerCompany(
            username,
            email,
            password,
            companyName
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                })
            },
            error => {
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.errorMessage) ||
                    error.message ||
                    error.toString()

                this.setState({
                    successful: false,
                    message: resMessage
                })
                console.log(error.response.errorMessage)
            }
        );
    }

    handleRegisterUser(formValue: { username: string; password: string }) {
        const { username, password } = formValue
    
        this.setState({
          message: '',
          successful: false
        })
    
        AuthService.registerUser(
          username,
          password
        ).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            })
          },
          error => {
            const resMessage = (
              error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
    
            this.setState({
              successful: false,
              message: resMessage
            })
          }
        )
      }

    render() {
        const { successful, message, isNewCompany } = this.state

        const initialValuesCompany = {
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            companyName: ''
        }

        const initialValuesUser = {
            username: '',
            password: '',
            passwordRepeat: '',
        }

        return (
            <div style={{ ...mainDivStyle }}>
                <div style={{ ...componentStyle }}>
                    {isNewCompany &&
                        <>
                            <Title text='Sign up company' />
                            <Formik
                                initialValues={ initialValuesCompany }
                                validationSchema={ this.validationSchemaCompany }
                                onSubmit={ this.handleRegisterCompany }
                            >
                                <Form>
                                    {!successful && (
                                        <div>
                                            <div style={{ ...inputGroupStyle }}>
                                                <label htmlFor='username'> Name </label>
                                                <Field name='username' type='text' style={{ ...inputStyle }} />
                                                <div style={{ ...errorMessageStyle }}>
                                                    <ErrorMessage name='username' />
                                                </div>
                                            </div>
                                            <div style={{ ...inputGroupStyle }}>
                                                <label htmlFor='email'> E-mail </label>
                                                <Field name='email' type='email' style={{ ...inputStyle }} />
                                                <div style={{ ...errorMessageStyle }}>
                                                    <ErrorMessage name='email' />
                                                </div>
                                            </div>
                                            <div style={{ ...inputGroupStyle }}>
                                                <label htmlFor='password'> Password </label>
                                                <Field name='password' type='password' style={{ ...inputStyle }} />
                                                <div style={{ ...errorMessageStyle }}>
                                                    <ErrorMessage name='password' />
                                                </div>
                                            </div>
                                            <div style={{ ...inputGroupStyle }}>
                                                <label htmlFor='passwordRepeat'> Repeat password </label>
                                                <Field name='passwordRepeat' type='password' style={{ ...inputStyle }} />
                                                <div style={{ ...errorMessageStyle }}>
                                                    <ErrorMessage name='passwordRepeat' />
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ ...inputGroupStyle }}>
                                                    <div style={{ ...inputGroupStyle }} >
                                                        <label htmlFor='companyName'>Company name</label>
                                                        <Field name='companyName' type='text' style={{ ...inputStyle }} />
                                                        <div style={{ ...errorMessageStyle }}>
                                                            <ErrorMessage name='companyName' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ ...inputGroupStyle }}>
                                                    <Button text='Sign up' type='submit' style={buttonStyle} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {
                                        message && (
                                            <div style={{ ...inputGroupStyle }}>
                                                <div style={successful ? { ...successMessageStyle } : { ...errorMessageStyle }} role='alert'>
                                                    {message}
                                                </div>
                                            </div>
                                        )
                                    }
                                </Form>
                            </Formik>
                        </>
                    }
                    {!isNewCompany &&
                        <>
                            <Title text='Sign up user' />
                            <Formik
                                initialValues={ initialValuesUser }
                                validationSchema={ this.validationSchemaUser }
                                onSubmit={ this.handleRegisterUser }
                            >
                                <Form>
                                    {!successful && (
                                        <div>
                                            <div style={{ ...inputGroupStyle }}>
                                                <label htmlFor='username'> Name </label>
                                                <Field name='username' type='text' style={{ ...inputStyle }} />
                                                <div style={{ ...errorMessageStyle }}>
                                                    <ErrorMessage name='username' />
                                                </div>
                                            </div>
                                            <div style={{ ...inputGroupStyle }}>
                                                <label htmlFor='password'> Password </label>
                                                <Field name='password' type='password' style={{ ...inputStyle }} />
                                                <div style={{ ...errorMessageStyle }}>
                                                    <ErrorMessage name='password' />
                                                </div>
                                            </div>
                                            <div style={{ ...inputGroupStyle }}>
                                                <label htmlFor='passwordRepeat'> Repeat password </label>
                                                <Field name='passwordRepeat' type='password' style={{ ...inputStyle }} />
                                                <div style={{ ...errorMessageStyle }}>
                                                    <ErrorMessage name='passwordRepeat' />
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ ...inputGroupStyle }}>
                                                    <Button text='Sign up' type='submit' style={buttonStyle} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {
                                        message && (
                                            <div style={{ ...inputGroupStyle }}>
                                                <div style={successful ? { ...successMessageStyle } : { ...errorMessageStyle }} role='alert'>
                                                    {message}
                                                </div>
                                            </div>
                                        )
                                    }
                                </Form>
                            </Formik>
                        </>
                    }
                </div>
            </div>
        )
    }
}
