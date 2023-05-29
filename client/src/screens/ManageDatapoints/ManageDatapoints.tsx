import * as React from 'react'
import CardList from '../../components/CardList/CardList'
import Popup from '../../components/Popup/Popup'
import Header from '../../components/Header/Header'
import Divider from '../../components/Divider/Divider'
import Title from '../../components/Title/Title'
import Button from '../../components/Button'
import DatapointCard, { titleStyles } from '../../components/DatapointCard/DatapointCard'

import { Formik, Field, Form, ErrorMessage, type FormikHelpers, type FormikValues } from 'formik'
import * as Yup from 'yup'
import { get, set, toInteger } from 'lodash'
import { useDatapointContext, type IDatapoint, initialDatapointForm } from '../../contexts/DatapointContext/DatapointContext'
import SubHeader from '../../components/SubHeader'
import Description from '../../components/Description'

const schema = Yup.object().shape({
  displayName: Yup.string().required(),
  direction: Yup.bool().required(),
  comparison: Yup.bool().required()
})

export interface ManageDatapointsProps {
  style?: React.CSSProperties
}

const ManageDatapoints = ({ style, ...props }: any): any => {
  const { getDatapoints, patchDatapoint, postDatapoint } = useDatapointContext()
  const [datapoints, setDatapoints] = React.useState<IDatapoint[]>([])
  const [editModal, setEditModal] = React.useState(false)
  const [initialValues, setInitialValues] = React.useState(initialDatapointForm)

  let submitAction: string | undefined

  const handleGetDatapoints = React.useCallback(async () => {
    try {
      const response = await getDatapoints()
      setDatapoints(response)
    } catch (error) {
      console.log('error', error)
    }
  }
  , [getDatapoints])

  const initializeForm = React.useCallback((index: number): void => {
    setInitialValues({
      displayName: datapoints[index].displayName || datapoints[index].dataPointKey,
      directionIsUp: String(datapoints[index].directionIsUp),
      comparisonIsAbsolute: String(datapoints[index].comparisonIsAbsolute),
      dataPointKey: datapoints[index].dataPointKey,
      id: datapoints[index].id,
      organizationId: datapoints[index].organizationId,
      latestValue: datapoints[index].latestValue,
      operation: datapoints[index].formula.operation,
      factor: datapoints[index].formula.factor
    })
  }, [datapoints])

  const datapointHandler = React.useCallback((key: number): void => {
    initializeForm(key)
    setEditModal(true)
  }, [initializeForm, setEditModal])

  const onFormSubmit = async (values: any): Promise<any> => {
    console.log('VALUES', values)
    const datapoint = {
      id: values.id,
      organizationId: values.organizationId,
      dataPointKey: values.dataPointKey,
      displayName: values.displayName,
      directionIsUp: values.directionIsUp === 'true',
      comparisonIsAbsolute: values.comparisonIsAbsolute === 'true',
      formula: {
        operation: values.operation,
        factor: toInteger(values.factor)
      }
    }
    console.log('DATOPOINT', datapoint)
    if (submitAction === 'save') {
      try {
        setEditModal(false)
        const response = await patchDatapoint(datapoint)
        handleGetDatapoints()
        console.log('RESPONSE', response)
      } catch (error) {
        console.log('error', error)
      }
    } else if (submitAction === 'saveAsNew') {
      try {
        setEditModal(false)
        const response = await postDatapoint(datapoint)
        handleGetDatapoints()
        console.log('RESPONSE', response)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    event.currentTarget.style.outline = '1px solid #4285f4'
  }

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    event.currentTarget.style.outline = ''
  }

  React.useLayoutEffect(() => {
    handleGetDatapoints()
    console.log('DATAPOINTS: ' + datapoints.toString())
  }, [handleGetDatapoints])

  return (
          <>
            <div style={{ ...wrapperStyles, ...style }}>
            <div style={{ ...innerStyles }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Title text={'Manage Datapoints'} style={{ ...titleStyle }} />
                {/* <Button text={'+'} />
                <button onClick={handleGetDatapoints}>Get Datapoints</button> */}
              </div>
                <Divider />
                <CardList
                cardType='DatapointCard'
                data={datapoints}
                editHandler={datapointHandler}
                ></CardList>
            </div>
            </div>
            {editModal &&
            <Popup onClose={() => {
              setEditModal(false)
            }}>
              <Header text='Add Datapoint' style={{ marginTop: 0 }}/>
              <Formik initialValues={initialValues} onSubmit={function (
                values: FormikValues,
                formikHelpers: FormikHelpers<FormikValues>): void | Promise<any> {
                console.log('FormVALUES', values)
                onFormSubmit(values)
              } } >
                {({ values }): JSX.Element => ( // , handleChange, handleBlur, handleSubmit, isSubmitting
                <Form>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <SubHeader text='Display Name' />
                      <Field name="displayName" placeholder={initialValues.displayName}
                        style={{ ...inputStyle }} onFocus={ handleFocus } onBlur={ handleBlur } />
                      <ErrorMessage name="displayName" />
                    </div>
                    <div>
                      <SubHeader text='Key' />
                      <Field name="key" value={initialValues.dataPointKey}
                        disabled style={{ ...datapointKeyStyles }} />
                    </div>
                  </div>
                  <Divider />
                  <div role='group' aria-labelledby='direction-group'>
                    <SubHeader text='Direction' />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Field name="directionIsUp" type="radio" value="true"/>
                      <Description text='Up is positive' style={{ margin: 0 }} />
                      <Field name="directionIsUp" type="radio" value='false'/>
                      <Description text='Down is positive' style={{ margin: 0 }} />
                      <Description text={values.directionIsUp} style={{ margin: 0 }} />
                    </div>
                    <ErrorMessage name="direction" />
                  </div>
                  <div role='group' aria-labelledby='comparison-group'>
                    <SubHeader text='Comparison' />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Field name="comparisonIsAbsolute" type="radio" value="false" />
                      <Description text='Percentage' style={{ margin: 0 }} />
                      <Field name="comparisonIsAbsolute" type="radio" value="true"/>
                      <Description text='Absolute' style={{ margin: 0 }} />
                    </div>
                    <ErrorMessage name="comparison" />
                  </div>
                  <Divider />
                  <Divider size={2} />
                  <div role='group' aria-labelledby='formula-group'>
                  <SubHeader text='Add Formula' />
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Field name="operation" type="radio" value="None" />
                      <Description text='None' style={{ margin: 0 }} />
                      <Field name="operation" type="radio" value="Multiply" />
                      <Description text='Multiply' style={{ margin: 0 }} />
                      <Field name="operation" type="radio" value="Divide"/>
                      <Description text='Divide' style={{ margin: 0 }} />
                      <Field name="operation" type="radio" value="Add" />
                      <Description text='Add' style={{ margin: 0 }} />
                      <Field name="operation" type="radio" value="Subtract"/>
                      <Description text='Substract' style={{ margin: 0 }} />
                    </div>
                    <Divider />
                    <Field name="factor" placeholder={values.factor}
                      style={{ ...inputStyle }}  onFocus={ handleFocus } onBlur={ handleBlur }  />
                  </div>
                  <Divider size={2} />
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                      <Button text={'Save Datapoint'} type='submit'
                        style={{ ...primaryButtonStyle, marginRight: 16 }} onClick={() => { submitAction = 'save' }} />
                      <Button text={'Save As New Datapoint'} type='submit'
                        onClick={() => { submitAction = 'saveAsNew' }} style={{ ...primaryButtonStyle }} />
                  </div>
                </Form>
                )}
              </Formik>
            </Popup>
            }
          </>
  )
}

export const wrapperStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)'
}

export const titleStyle: React.CSSProperties = {
  color: 'white'
}

export const innerStyles: React.CSSProperties = {
  // display: 'flex',
  // flexDirection: 'row',
  width: 500,
  height: 500,
  // boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
  // backgroundColor: 'darkgrey',
  // border: '1px solid black',
  padding: '10px'
}

export const datapointKeyStyles: React.CSSProperties = {
  backgroundColor: '#f0f0f0',
  color: '#a0a0a0',
  cursor: 'not-allowed',
  borderRadius: 5,
  border: '1px solid #D3D3D3',
  height: '2vh',
  width: '20vh'
}

const inputStyle: React.CSSProperties = {
  borderRadius: 5,
  border: '1px solid #D3D3D3',
  height: '2vh',
  width: '20vh',
  marginRight: '3vh',
}

export const primaryButtonStyle: React.CSSProperties = {
  borderRadius: 5,
  backgroundColor: '#4285f4',
  border: '1px solid #0275d8',
  color: 'white',
  marginTop: '2vh',
  height: '3vh'
}

export default ManageDatapoints
