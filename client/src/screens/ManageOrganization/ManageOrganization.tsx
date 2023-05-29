import * as React from 'react'
import CardList from '../../components/CardList'
import Title from '../../components/Title'
import Button from '../../components/Button'
import Popup  from '../../components/Popup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useManageOrganizationContext, type IOrganization } from '../../contexts/ManageOrganization/ManageOrganizationContext'
import SubHeader from '../../components/SubHeader/SubHeader'
// TODO: Import context and update the methods

export interface ManageOrganizationProps {

}

const ManageOrganization = ({ ...props }: ManageOrganizationProps): any => {
    const [ inviteModal, setInviteModal ] = React.useState(false)
    const [ editModal, setEditModal ] = React.useState(false)
    const { getOrganizationMembers, inviteMember, changeMemberRole, removeMember, getOrganizationDetails } = useManageOrganizationContext()
    const [ members, setMembers ] = React.useState<any[]>([])
    const [ roleToChange, setRoleToChange ] = React.useState<string>('Viewer')
    const [ position, setPosition ] = React.useState(0)
    const [ organization, setOrganization ] = React.useState<IOrganization>(
        {organizationId: '', organizationName: '', organizationOwnerId: '',
        apiKey: '', creationDate: '', modificationDate: ''})

    const handleGetOrganizationMembers = React.useCallback(async () => {
        try {
            const response = await getOrganizationMembers()
            setMembers(response.users)
        } catch(error) {
            console.log(error)
        }
    }, [])

    const handleGetOrganizationDetails = React.useCallback(async () => {
        try {
            const response = await getOrganizationDetails()
            setOrganization(response)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const addMemberHandler = (): void => {
        setInviteModal(true)
    }

    const addMemberInitialValues = {
        email: '',
        role: 'Viewer',
        message: ''
    }

    const addMemberValidationSchema = () => {
        return Yup.object().shape({
            email: Yup.string().required('This field is required!')
        })
    }

    const handleInviteMember = React.useCallback( async(
        formValue: {email: string, role: string, message: string}) => {
        try {
            const response = await inviteMember(
                formValue.email, formValue.role, formValue.message)
                    if(response.status === 200)
                        setInviteModal(false)
                        setPosition(0)
                        handleGetOrganizationMembers()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }, [])

    React.useEffect(() => {
        handleGetOrganizationMembers();
    }, []);

    const createRoleArray = (role: string) => {
        if(role === 'Admin') 
            return [ 'Viewer', 'Editor', 'Admin'] 
        else if(role === 'Editor')
            return [ 'Viewer', 'Editor' ]
        else if(role === 'Viewer')
            return [ 'Viewer' ]
        
        var toReturn: string[] = []
        return toReturn
    }

    const handleRoleSet = (role: string) => {
        addMemberInitialValues.role = role
    }

    const handleRoleChange = (role: string) => {
        setRoleToChange(role)
    }

    const handleUserEdit = React.useCallback( async() => {
        try {
            const response = await changeMemberRole(
                members[position].id, roleToChange)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }, [roleToChange, position])

    const handleRemoveUser = React.useCallback( async () => {
        console.log(members)
        try {
            var id = members[position].id
            const response = await removeMember(id)
            console.log(response)
            if(response.status == 200) {
                setEditModal(false)
                setPosition(0)
                handleGetOrganizationMembers()
            }
        } catch (error) {
            console.log(error)
        }
    }, [members, position])

    const editHandler = React.useCallback((key: number): void => {
        setEditModal(true)
        setPosition(key)
    }, [setEditModal])

    React.useLayoutEffect(() => {
        handleGetOrganizationMembers()
        handleGetOrganizationDetails()
        
    }, [handleGetOrganizationMembers, handleGetOrganizationDetails])

    const handleFocus = (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
        event.currentTarget.style.outline = '1px solid #4285f4'
    }
    
    const handleBlur = (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
      event.currentTarget.style.outline = ''
    }

    return (
        <>
            <div style={{ ...wrapperStyles }}>
                <div style={{ ...innerStyles }}>
                    <div style={{ ...topDivStyle }}>
                        <Title text={ organization.organizationName } style={{ ...textStyles }} />
                        <Button text='Invite Member' style={ buttonStyle } onClick={addMemberHandler} />
                    </div>
                    <div style={{ ...descriptionStyle }}>
                        <p style={{ ...textStyles }} >Api key:&nbsp;&nbsp; </p>
                        <p style={{ ...textStyles }} >{organization.apiKey}</p>
                    </div>
                    <div style={{ ...descriptionStyle }}>
                        <p style={{ ...textStyles }} >Creation date:&nbsp;&nbsp; </p>
                        <p style={{ ...textStyles }} >{organization.creationDate}</p>
                    </div>
                    <div style={{ ...descriptionStyle }}>
                        <p style={{ ...textStyles }} >Last modified:&nbsp;&nbsp; </p>
                        <p style={{ ...textStyles }} >{organization.modificationDate}</p>
                    </div>
                    <div>
                        <CardList cardType='UserCard' data={ members } editHandler={ editHandler } ></CardList> 
                    </div>
                </div>
            </div>
            { inviteModal &&
                <Popup onClose={() => { setInviteModal(false) }}>
                    <Formik
                        initialValues={ addMemberInitialValues }
                        validationSchema={ addMemberValidationSchema }
                        onSubmit={ handleInviteMember } >
                            <Form>
                                <div style={{ ...inputGroupStyle }}>
                                    <Title text='Invite a new member' />
                                </div>
                                <div style={{ ...inputGroupStyle }}>
                                    <label htmlFor='email'>E-mail address</label>
                                    <Field name='email' type='email' style={{ ...inputStyle }} 
                                        onFocus={ handleFocus } onBlur={ handleBlur } />
                                    <ErrorMessage name='email' component='div' className='error' />
                                </div>
                                <div style={{ ...inputGroupStyle }} >
                                    <label htmlFor='role'>Role</label>
                                    <select name='role' style={{ ...inputStyle }} onFocus={ handleFocus }
                                        onBlur={ handleBlur } onChange={event => handleRoleSet(event.target.value)}>
                                            <option id='0' >Viewer</option>
                                            <option id='1' >Editor</option>
                                            <option id='2' >Admin</option>
                                    </select>
                                    <ErrorMessage name='role' component='div' className='error' />
                                </div>
                                <div style={{ ...inputGroupStyle }}>
                                    <label htmlFor='message'>Message</label>
                                    <Field name='message' type='text' style={{ ...inputStyle }}
                                        onFocus={ handleFocus } onBlur={ handleBlur } />
                                </div>
                                <div style={{ ...inputGroupStyle }} >
                                    <Button type='submit' text={'Invite'} style={{ ...buttonStyle }} />
                                </div>
                            </Form>
                    </Formik>
                </Popup>   
            }
            { editModal &&
                <Popup onClose={() => { setEditModal(false) }}>
                    <div style={{ ...inputGroupStyle, margin: '4vh' }}>
                        <label>Select a role </label>
                        <select name='role' style={{ ...inputStyle }} onFocus={ handleFocus }
                            onBlur={ handleBlur } onChange={event => handleRoleChange(event.target.value)}>
                                <option id='0' >Viewer</option>
                                <option id='1' >Editor</option>
                                <option id='2' >Admin</option>
                        </select>
                    </div>
                    <div style={{ ...buttonGroupStyle }}>
                        <Button text='Save' onClick={ handleUserEdit }
                            style={{ ...buttonStyle, marginRight: '1vh', height: 'auto' }} ></Button>
                        <Button text='Remove user' style={{ ...dangerButtonStyle }} onClick={ handleRemoveUser } ></Button>
                    </div>
                </Popup>  
            }
        </>
    )
}

export const buttonStyle: React.CSSProperties = {
    borderRadius: 5,
    backgroundColor: '#4285f4',
    border: '1px solid #0275d8',
    width: '30%',
    color: 'white',
    marginTop: '2vh',
    height: '3vh'
}

export const textStyles: React.CSSProperties = {
    color: 'white'
}

export const descriptionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',  
}

export const dangerButtonStyle: React.CSSProperties = {
    borderRadius: 5,
    width: '30%',
    backgroundColor: '#FF0000',
    border: '1px solid #FF0000',
    color: 'white',
    marginTop: '2vh',
    height: 'auto'
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
    background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)'
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

const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px'

}

const inputStyle: React.CSSProperties = {
    borderRadius: 5,
    border: '1px solid #D3D3D3',
    height: '2vh',
    width: '20vh',
}

export default ManageOrganization
