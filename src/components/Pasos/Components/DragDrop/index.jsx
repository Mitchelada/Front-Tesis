import React, { useState, useContext, useEffect } from 'react';
import {
  PasosContext
} from '../../Provider'
import { useDispatch, useSelector } from 'react-redux'
import { addRequirement, deleteRequirement, updateRequirementsWeight } from '../../../../redux/requirements/duck'


import {Empty,Button,Input, Col, Spin, Popconfirm } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../../../../styles/drag.css';

const getItemStyle = (draggableStyle) => ({
  border: '2px solid #000',

  // styles we need to apply on draggables
  ...draggableStyle
});


const DragNDropItem = ({
  index,
  provided,
  id,
  name
}) => {

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const PasosCtx = useContext(PasosContext)

  const deleteRequirementAction = id => {

    const data = {
      requirementId: id,
      projectId: PasosCtx.projectId
    }
    setVisible(false)
    dispatch(deleteRequirement(data))
  }

  return (
    <Popconfirm visible={visible}
                title='Do you want to delete this requirement?'
                onConfirm={() => deleteRequirementAction(id)}
                onCancel={() => setVisible(false)}>
          <li ref={provided.innerRef} 
              {...provided.draggableProps} 
              {...provided.dragHandleProps}
              onContextMenu={(e) => {
                e.preventDefault()
                setVisible(true)
              }}
              style={getItemStyle(provided.draggableProps.style)}>
            <p>
              { name }
            </p>
          </li>
    </Popconfirm>
  )
}

const DragDrop = ()=> {

  const [requirements, updateRequirements] = useState([]);
  const [requirement, setRequirement] = useState({id:'' ,name:''})
  const requirements_duck = useSelector(state => state.requirements.requirements)
  const loading_duck = useSelector(state => state.requirements.loading)

  const PasosCtx = useContext(PasosContext)
  const dispatch = useDispatch()

  // TODO: Reordenamiento de lista de requerimientos
  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(requirements)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    items.forEach((item, key) => {
      item.projectId = PasosCtx.projectId
      item.weight = key+1
      dispatch(updateRequirementsWeight(item))
    })

    updateRequirements(items)
  }

  // TODO: onChange input para agregar requerimiento
  const handleKeep = (e) =>{
    setRequirement({
        id: String(requirements.length+1),
        name: e.target.value
    })
  }

  // TODO: agregar requerimiento
  const handleAdd = () =>{

    if(requirement.name === ""){
      return 
    }
    
    updateRequirements([...requirements, requirement])
    setRequirement({
        id:'',
        name: ''
    })

    // Project
    const projectId = PasosCtx.projectId

    // Requirement
    const lastValue = { name: requirement.name }

    lastValue.weight = requirements.length + 1
    
    // Data
    lastValue.projectId = projectId

    dispatch(addRequirement(lastValue))
  }

  // TODO: Marcar activo/no activo el step de aspectos
  useEffect(() => {
    if(PasosCtx.currentStep !== 0) {
      if(requirements.length >= 1) {
        PasosCtx.setShowAspects(true)
        PasosCtx.setCurrentStep(2)
      }else{
        PasosCtx.setShowAspects(false)
        PasosCtx.setCurrentStep(1)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirements])

  // TODO: Asignar requerimientos desde 
  // TODO: el duck al state para el drag and drop
  useEffect(() => {
    requirements_duck.forEach((item, key) => {
      requirements_duck[key].id = item.id.toString()
      console.log('[key]', key)
    })
    updateRequirements(requirements_duck)
  }, [requirements_duck])

  return (
    PasosCtx.showDragNDrop && requirements_duck.length === 0 && loading_duck ? (
      <Col span={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Col>
    ) : PasosCtx.showDragNDrop && (

        <Col span={5}>
          <div className="App" style={{width:'100%'}}>
            <header className="App-header">
              <h2>Order Requirements</h2>
            </header>
          
            <Input style={{ width: '60%' }} value={requirement.name} onChange={handleKeep} />
            <br/>
            <Button onClick={handleAdd} type="primary">Add</Button>

          <br/>
          <br/>
          {
            requirements.length===0 ?
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{position:"absolute", width:"300px"}}/>
              :
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="requirements">
                {(provided) => (
                  <ul className="requirement" {...provided.droppableProps} ref={provided.innerRef} style={{width:'65%'}}>
                    {requirements.map(({id, name}, index) => {
                      return (
                        <Draggable key={id} draggableId={id.toString()} index={index}>
                        {(provided) => (
                          <DragNDropItem index={index}
                                        provided={provided}
                                        id={id}
                                        name={name}/>
                      )}
                      </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            
          }
          </div>
        </Col>
    )
  );
}

export default DragDrop