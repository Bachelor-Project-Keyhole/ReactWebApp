import * as React from 'react'
import CardList from '../../components/CardList/CardList'
import Popup from '../../components/Popup/Popup'
import Header from '../../components/Header/Header'
import Divider from '../../components/Divider/Divider'
import Title from '../../components/Title/Title'
import Button from '../../components/Button'
import DatapointCard from '../../components/DatapointCard/DatapointCard'

import { Formik, Field, Form, ErrorMessage, type FormikHelpers, type FormikValues } from 'formik'
import * as Yup from 'yup'
import { get, toInteger } from 'lodash'
import { useDatapointContext, type IDatapoint } from '../../contexts/DatapointContext/DatapointContext'
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
  const [initialValues, setInitialValues] = React.useState({
    displayName: 'ss',
    directionIsUp: 'false',
    comparisonIsAbsolute: 'false',
    dataPointKey: '',
    id: 0,
    organizationId: 0
  })
  let submitAction: string | undefined

  const handleGetDatapoints = React.useCallback(async () => {
    try {
      const response = await getDatapoints()
      setDatapoints(response)
      // setDatapoints([
      //   { id: 1, organizationId: 1, dataPointKey: 'test1', displayName: 'testtest1', directionIsUp: true, comparisonIsAbsolute: true },
      //   { id: 2, organizationId: 2, dataPointKey: 'test2', displayName: 'testtest2', directionIsUp: false, comparisonIsAbsolute: false },
      //   { id: 3, organizationId: 3, dataPointKey: 'test3', displayName: 'testtest3', directionIsUp: true, comparisonIsAbsolute: false }
      // ])
      console.log('RESPONSE', response)
    } catch (error) {
      console.log('error', error)
    }
  }
  , [getDatapoints])

  const datapointHandler = (key: number): void => {
    console.log('KEY: ' + key)
    // setPopupKey(key)
    initializeForm(key)
    setEditModal(true)
  }

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
      console.log('SAVE')

      try {
        const response = await patchDatapoint(datapoint)
        console.log('RESPONSE', response)
      } catch (error) {
        console.log('error', error)
      }
    } else if (submitAction === 'saveAsNew') {
      console.log('SAVE AS NEW')

      try {
        const response = await postDatapoint(datapoint)
        console.log('RESPONSE', response)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  const initializeForm = (index: number): void => {
    console.log('INITIALIZE FORM' + index)

    setInitialValues({
      displayName: datapoints[index].displayName || datapoints[index].dataPointKey,
      directionIsUp: String(datapoints[index].directionIsUp),
      comparisonIsAbsolute: String(datapoints[index].comparisonIsAbsolute),
      dataPointKey: datapoints[index].dataPointKey,
      id: datapoints[index].id,
      organizationId: datapoints[index].organizationId
    })
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
                <Title text={'Manage Datapoints'}/>
                <Button text={'+'} />
                <button onClick={handleGetDatapoints}>Get Datapoints</button>
              </div>
                <div style={{ backgroundColor: 'lightgrey', height: 24 }}>searchbar</div>
                <Divider />
                <CardList
                cardType='DatapointCard'
                data={datapoints}
                editHandler={datapointHandler}
                ></CardList>
            </div>
            </div>
            {editModal &&
            <Popup onClose={() => { setEditModal(false) }}>
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
                      <Field name="displayName" value={initialValues.displayName} />
                      <ErrorMessage name="displayName" />
                    </div>
                    <div>
                      <SubHeader text='Key' />
                      <Field name="key" value={initialValues.dataPointKey} disabled style={{ ...datapointKeyStyles }}/>
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
                      <Field name="operation" type="radio" value="none" />
                      <Description text='None' style={{ margin: 0 }} />
                      <Field name="operation" type="radio" value="multiply" />
                      <Description text='Multiply' style={{ margin: 0 }} />
                      <Field name="operation" type="radio" value="divide"/>
                      <Description text='Divide' style={{ margin: 0 }} />
                      <Field name="operation" type="radio" value="add" />
                      <Description text='Add' style={{ margin: 0 }} />
                      <Field name="operation" type="radio" value="substract"/>
                      <Description text='Substract' style={{ margin: 0 }} />
                    </div>
                    <Divider />
                    <Field name="factor" type="input" placeholder="none"/>
                  </div>
                  <Divider size={2} />
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                      <Button text={'Save Datapoint'} type='submit' style={{ marginRight: 16 }} onClick={() => { submitAction = 'save' }} />
                      <Button text={'Save As New Datapoint'} type='submit' onClick={() => { submitAction = 'saveAsNew' }} />
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
  backgroundColor: '#f1f1f1'
  // margin: '0',
  // padding: '50px',
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
  cursor: 'not-allowed'
}

export default ManageDatapoints
