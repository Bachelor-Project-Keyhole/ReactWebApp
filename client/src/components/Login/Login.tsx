import { Component } from 'react'
import * as React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import AuthContext from '../../contexts/Authentication/AuthService'
import { Navigate } from 'react-router-dom';
import Button from '../Button'
import Title from '../Title'
import Logo from '../MenuLayout'

type Props = {};

type State = {
    redirect: string | null,
    email: string,
    password: string,
    loading: boolean,
    message: string,
    inputBorder: string
};

export const componentStyles: React.CSSProperties = {
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
    borderRadius: 25,
    borderColor: '#f5c6cb'
}

const mainDivStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
}

const buttonStyle: React.CSSProperties = {
    borderRadius: 5,
    backgroundColor: '#0275d8',
    border: '2px solid #0275d8',
    color: 'white'
}

export default class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            redirect: null,
            email: '',
            password: '',
            loading: false,
            message: '',
            inputBorder: ''
        }

    }

    componentDidMount() {
        const currentUser = AuthContext.getCurrentUser();
    }

    componentWillUnmount() {
        window.location.reload()
    }

    validationSchema() {
        return Yup.object().shape({
            email: Yup.string().required('This field is required!'),
            password: Yup.string().required('This field is required!')
        })
    }

    handleLogin(formValue: { email: string; password: string }) {
        const { email, password } = formValue;

        this.setState({
            message: "",
            loading: true
        });

        AuthContext.login(email, password).then(
            () => {
                this.setState({
                    //redirect: '/profile'
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { message } = this.state
        const initialValues = {
            email: '',
            password: ''
        }

        return (
            <div style={{ ...mainDivStyle }}>
                <div style={{ ...componentStyles }}>
                    <Title text='Sign in' />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={this.validationSchema}
                        onSubmit={this.handleLogin}>
                        <Form>
                            <div style={{ ...inputGroupStyle }}>
                                <label htmlFor='email'>E-mail</label>
                                <Field name='email' type='email' style={{ ...inputStyle }} />
                                <div style={{ ...errorMessageStyle }}>
                                    <ErrorMessage name='email' />
                                </div>
                            </div>
                            <div style={{ ...inputGroupStyle }}>
                                <label htmlFor='password'>Password</label>
                                <Field name='password' type='password' style={{ ...inputStyle }} />
                                <div style={{ ...errorMessageStyle }}>
                                    <ErrorMessage name='password' />
                                </div>
                            </div>
                            <div style={{ ...inputGroupStyle }}>
                                <Button type='submit' text='Sign in' style={buttonStyle} />
                            </div>
                            {message && (
                                <div style={{ ...errorMessageStyle }}>
                                    {message}
                                </div>
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
        )
    }
}
