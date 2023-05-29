import * as React from 'react'
import DashboardGrid from '../../components/DashboardGrid/DashboardGrid'
import Block, { type BlockProps } from '../../components/Block/Block'
import GridElement from '../../components/GridElement'
import Button from '../../components/Button/Button'
import TemplateCreator from '../../components/TemplateCreator/TemplateCreator'
import { initialTemplate, useTemplateContext, type ITemplate, type ITemplatePost, initialTemplatePost } from '../../contexts/TemplateContext/TemplateContext'
import { type IDashboard, useDashboardContext, initialDashboard } from '../../contexts/DashboardContext/DashboardContext'
import { Field, Form, Formik, type FormikHelpers, type FormikValues } from 'formik'
import { useParams, useNavigate } from 'react-router-dom'

export interface ManageDashboardProps {
  style?: React.CSSProperties
}

const ManageDashboard = ({ style }: ManageDashboardProps): JSX.Element => {
  // const [newGridElements, setNewGridElements] = React.useState(gridElements)
  // const [blocks, setBlocks] = React.useState<BlockProps[]>([]) // { x: 0, y: 0, width: 1, height: 1 }, { x: 2, y: 2, width: 2, height: 2 }
  const navigate = useNavigate()
  const [draggedTemplate, setDraggedTemplateTemplate] = React.useState<ITemplatePost>(initialTemplatePost)// template
  const { loadDashboard, updateDashboard } = useDashboardContext()
  const { createTemplate } = useTemplateContext()
  const [dashboard, setDashboard] = React.useState<any>(initialDashboard)
  const [newDashboard, setNewDashboard] = React.useState<any>()
  const [newTemplates, setNewTemplates] = React.useState<any[]>([])
  const { dashboardId } = useParams()
  // const [newTemplates, setNewTemplates ] = React.useState<any[]>([])
  console.log('dashboardIdddd', dashboardId)

  const handleLoadDashboard = React.useCallback(async () => {
    try {
      const response = await loadDashboard(dashboardId)
      if (response) {
        setDashboard(response)
        console.log('DASHBOAAARD', response)
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const onFormSubmit = React.useCallback(async (values: FormikValues) => {
    console.log('values', values)
    const newDashboard = {
      dashboardId: dashboard.dashboardId,
      dashboardName: values.dashboardName
    }
    console.log('newDashboard', newDashboard)
    try {
      const response = await updateDashboard(newDashboard.dashboardName, newDashboard.dashboardId)
      navigate('/menu')
    } catch (error) {
      console.log('error', error)
    }
    // try {
    //   const response = await createTemplate(
    //     {

    //     }
    //   )
    // }
  }, [dashboard])

  const handleOnDragStart = React.useCallback((e: React.DragEvent, newTemplate: ITemplatePost): void => {
    setDraggedTemplateTemplate(newTemplate)
  }
  , [])

  // const handleOnDrop = React.useCallback((e: any, i: number, j: number): void => {
  //   console.log('drop', i, j)

  //   // setDraggedTemplateTemplate(e.dataTransfer.getData('template'))
  //   // console.log('drop', e.dataTransfer.getData('template'))

  //   const tempArray = [...newGridElements]
  //   const tempBlocks = [...blocks]
  //   tempBlocks.push({
  //     x: i,
  //     y: j,
  //     width: 1,
  //     height: 1,
  //     component:
  //       <GridElement
  //         text={draggedTemplate.text}
  //         style={{
  //           height: '100%',
  //           width: '100%'
  //         }} />
  //   })
  //   setBlocks(tempBlocks)
  //   setNewGridElements(tempArray)
  // }
  // , [newGridElements, draggedTemplate])

  React.useLayoutEffect(() => {
    handleLoadDashboard()
  }, [handleLoadDashboard])

  React.useEffect(() => {
    console.log('newTemplates', newTemplates)
    console.log('dashboard', dashboard)
  }, [newTemplates, dashboard])
  return (
        <div style={{ ...wrapperStyles, ...style }}>
          Manage Dashboard
            <div style={{ ...innerStyles }}>

                <DashboardGrid
                  setNewTemplates={setNewTemplates}
                  newTemplates={newTemplates}
                  dashboard={dashboard}
                  draggedTemplate={draggedTemplate} />
                <div style={{ padding: 8 }}>
                  <div>
                   <TemplateCreator dashboardId={dashboardId || ' '} handleOnDragStart={handleOnDragStart}/>

                  </div>
                </div>

            </div>
            <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Formik
                      initialValues={{
                        dashboardName: dashboard ? dashboard.name : ''
                      }}
                      onSubmit={function (
                        values: FormikValues,
                        formikHelpers: FormikHelpers<FormikValues>): void | Promise<any> {
                        console.log('FormVALUES', values)
                        onFormSubmit(values)
                      } }
                    >
                      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form>
                          <Field type='input' name='dashboardName' placeholder={dashboard.dashboardName} />
                          <Button text='Save Dashboard' type='submit' onClick={() => {}} />
                        </Form>
                      )}
                    </Formik>

                    <Button text='Cancel' onClick={() => {}} />
            </div>

        </div>
  )
}

export const wrapperStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '80vh',
  // padding: 8,
  backgroundColor: '#f1f1f1'
}

export const innerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  margin: 16

  // padding: '10px'
}

export default ManageDashboard
