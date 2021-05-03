import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { getAllRequirementsAssocietedToProject } from '../../redux/requirements/duck'
import { getAllAspectsAssocietedToProject } from '../../redux/aspects/duck'

import {
  PasosContext,
  PasosProvider
} from './Provider'

import { 
  AlignCenterOutlined, 
  OrderedListOutlined, 
  UnorderedListOutlined, 
  CheckCircleOutlined,
  ClusterOutlined 
} from '@ant-design/icons';

import { 
  Select, 
  Row, 
  Col,
  Steps 
} from 'antd';

import Components from './Components'
import services from './services'

import 'antd/dist/antd.css'


const { Option } = Select;
const { Step } = Steps;
const {
  DragDrop,
  Aspectos,
  Elementos,
} = Components


const ListProjects = () => {

  const dispatch = useDispatch()

  const PasosCtx = useContext(PasosContext)
  const allProjects = services.getAllProjects()

  // TODO: onChange select
  const handleProjectSelect = (value) => {
    if(Number.isFinite(value)) {

      const { name } = allProjects.find(project => project.id === value)

      dispatch(getAllRequirementsAssocietedToProject(value))
      dispatch(getAllAspectsAssocietedToProject(value))
      PasosCtx.setProjectId(value)
      PasosCtx.setProjectName(name)
      PasosCtx.setCurrentStep(1)
      PasosCtx.setShowDragNDrop(true)
      PasosCtx.setShowElements(false)
    } else {
      PasosCtx.setProjectId(null)
      PasosCtx.setCurrentStep(0)
      PasosCtx.setShowDragNDrop(false)
    }
  }

  return (
    <>
      <Select defaultValue="--Select a Project--" style={{ width: "72%" }} onChange={handleProjectSelect}>
        <Option value="--Select a Project--">--Select a Project--</Option>
        {
          allProjects.map(proyecto => (
            <Option value={proyecto.id} key={proyecto.id}>{proyecto.name}</Option>
          ))
        }
      </Select>
    </>
  )
}

const PasosItems = () => {

  const PasosCtx = useContext(PasosContext)

  return (
    <div>
        <Steps current={PasosCtx.currentStep} onChange={step => PasosCtx.setCurrentStep(step)} style={{width:"95%"}}>
          <Step  title="Select a project" icon={<ClusterOutlined />} />
          <Step  title="Order Requirements" icon={<AlignCenterOutlined />} />
          <Step  title="Aspects" icon={<OrderedListOutlined />} />
          <Step  title="Elements" icon={<UnorderedListOutlined />} />
          <Step  title="Done" icon={<CheckCircleOutlined />} />
        </Steps>

        <hr/>
        <br/>

        <Row>
          <Col span={3} style={{width: "80%"}}>
              <header className="App-header">
                  <h2>Select a Project</h2>
              </header>
              <ListProjects />
          </Col>

          <DragDrop/>

          <Aspectos/>
          <Elementos/>

        </Row>
    </div>
  )

}

const Pasos = () => {

  return (
    <PasosProvider>
      <PasosItems/>
    </PasosProvider>
  )
}

export default Pasos