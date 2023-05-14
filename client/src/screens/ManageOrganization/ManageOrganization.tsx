import * as React from 'react'
import CardList from '../../components/CardList'
import Title from '../../components/Title'
import Button from '../../components/Button'
import Popup  from '../../components/Popup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// TODO: Import context and update the methods

export interface ManageOrganizationProps {
    companyName: string
    users: any[]  // TODO: make an entity for users and use it here
}

 // TODO: Context and methods for pulling users

const ManageUsers = ({ ...props }: ManageOrganizationProps): any => {
    const [editModal, setEditModal] = React.useState(false)

    const addMemberHandler = (): void => {
        setEditModal(true)
    }

    const addMemberInitialValues = {
        email: '',
        role: ''
    }

    const addMemberValidationSchema = () => {
        return Yup.object().shape({
            email: Yup.string().required('This field is required!'),
            role: Yup.string().required('This field is required!')
        })
    }

    const handleAddMember = (formValue: {email: string, role: string}) => {
        
    }

    const handleRoleSet = (role: string) => {
        addMemberInitialValues.role = role
    }

    const handler = () => {}

    return (
        <>
            <div style={{ ...wrapperStyles }}>
                <div style={{ ...innerStyles }}>
                    <div style={{ ...topDivStyle }}>
                        <Title text={props.companyName} />
                        <Button text='Invite Member' style={ buttonStyle } onClick={addMemberHandler}/>
                    </div>
                    <div>
                        <CardList cardType='MemberCard' data={ props.users } editHandler={ handler } /> 
                    </div>
                </div>
            </div>
            {editModal && <Formik
                initialValues={ addMemberInitialValues }
                validationSchema={ addMemberValidationSchema }
                onSubmit={ handleAddMember } >
                    <Popup onClose={() => { setEditModal(false) }}>
                        <div style={{ ...inputGroupStyle }}>
                            <Title text='Invite a new member' />
                        </div>
                        <div style={{ ...inputGroupStyle }}>
                            <label htmlFor='email'>E-mail address</label>
                            <Field name='email' tyoe='email' style={{ ...inputStyle }} />
                        </div>
                        <div style={{ ...inputGroupStyle }} >
                            <label htmlFor='role'>Role</label>
                            <select name='role' style={{ ...inputStyle }}
                                onChange={event => handleRoleSet(event.target.value)}>
                                    <option id='0' >Viewer</option>
                                    <option id='1' >Editor</option>
                                    <option id='2' >Moderator</option>
                            </select>
                        </div>
                        <div style={{ ...inputGroupStyle }} >
                            <Button type='submit' text={'Invite'} style={{ ...buttonStyle }} />
                        </div>
                    </Popup>
                </Formik>
            }
        </>
    )
}

export const buttonStyle: React.CSSProperties = {
    borderRadius: 5,
    backgroundColor: '#0275d8',
    border: '2px solid #0275d8',
    color: 'white',
    marginTop: '2vh',
    height: '3vh'
}

export const topDivStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const wrapperStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vh',
    backgroundColor: '#f1f1f1'
}

export const innerStyles: React.CSSProperties = {
    width: 500,
    height: 500,
    padding: '10px'
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

export default ManageUsers
