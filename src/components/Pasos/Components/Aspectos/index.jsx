import React, { useContext, useEffect, useState } from 'react';
import {
    PasosContext
} from '../../Provider'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { addAspect, deleteAspect, updateAspectsWeight } from '../../../../redux/aspects/duck'
import { getAllElementsAssocietedToAspect } from '../../../../redux/elements/duck'

import {Empty,Button,Input, Col, Row, Select, Popconfirm} from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import '../../../../styles/aspects.css'

const { Option } = Select

const getItemStyle = (type, draggableStyle) => ({
  border: type === 'BENEFIT' ? '2px solid green' : '2px solid red',

  // styles we need to apply on draggables
  ...draggableStyle
});

const DragNDropElement = ({
  provided,
  snapshot,
  id,
  name,
  type,
  handleMessage
}) => {

  const [visible, setVisible] = useState(false)

  // TODO: Cada vez que los elementos cambian, se actualiza
  // TODO: la cantidad de elementos del aspecto
  const [count, setCount] = useState(0)
  const PasosCtx = useContext(PasosContext)
  const dispatch = useDispatch()
  const elements = useSelector(state => state.elements.elements)

  const getElementsCountFromAspects = async () => {
    const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/aspect/countElements/${id}`)
    
    if(response.data.countElements[0] !== undefined) {
      if(response.data.countElements[0].hasOwnProperty('countElements')) {
        setCount(response.data.countElements[0].countElements)
      }else{
        setCount(0)
      }
    }
  }

  const deleteAspectAction = async () => {
    const data = {
      aspectId: id,
      projectId: PasosCtx.projectId
    }
    dispatch(deleteAspect(data)) 
    setVisible(false)
  }

  useEffect(() => {
    getElementsCountFromAspects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getElementsCountFromAspects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements])

  useEffect(() => {
    console.log('snapshot ', snapshot)
  }, [snapshot])

  return (
    <Popconfirm visible={visible}
                title='Do you want to delete this aspect?'
                onConfirm={() => deleteAspectAction(id)}
                onCancel={() => setVisible(false)}>
      <li ref={provided.innerRef} 
        {...provided.draggableProps} 
        {...provided.dragHandleProps} 
        onClick= { ()=> handleMessage(id, name, type)}
        onContextMenu={(e) => {
          e.preventDefault()
          setVisible(true)
        }}
        style={getItemStyle(
          type,
          provided.draggableProps.style
        )}>
        <p>
        { name } ({ count })
        </p>
      </li>
    </Popconfirm>
  )

}

const Aspectos = ()=> {

  const [aspectos, updateAspectos] = useState([]);
  const [aspecto, setAspecto] = useState({id:'' ,name:''})
  const [type, setType] = useState('--Select a Project--')

  const requirements_duck = useSelector(state => state.requirements.requirements)
  const aspects_duck = useSelector(state => state.aspects.aspects)

  const PasosCtx = useContext(PasosContext)
  const dispatch = useDispatch()

  // TODO: Reordenamiento de lista de requerimientos
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(aspectos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    items.forEach((item, key) => {
      item.projectId = PasosCtx.projectId
      item.importance = (items.length - key)
      dispatch(updateAspectsWeight(item))
    })

    updateAspectos(items);
  }

  // TODO: onChange input para agregar requerimiento
  const handleKeep = (e) =>{
    setAspecto({
        id: String(aspectos.length+1),
        name: e.target.value,
        type
    })
  }

  // TODO: onChange select tipo para agregar requerimiento
  const handleKeepType = (typeSelect) =>{
    setType(typeSelect)
    setAspecto({ ...aspecto, type: typeSelect })
  }

  // TODO: agregar aspecto
  const handleAdd = () =>{

    if(aspecto.name !== "" && type !== '--Select a Project--'){
      updateAspectos([...aspectos, aspecto])
      PasosCtx.setAspects([...aspectos, aspecto])
        setAspecto({
            id:'',
            name: ''
        })

      // Project
      const projectId = PasosCtx.projectId

      // Requirement
      const lastValue = { name: aspecto.name }

      lastValue.importance = aspectos.length + 1
      lastValue.type = type
      
      // Data
      lastValue.projectId = projectId
      
      dispatch(addAspect(lastValue))
    }
          
  }

  // TODO: onClick en aspecto para traer elementos asociados
  const handleMessage = (id, name, type) =>{

    const { projectReady } = PasosCtx

    if(!projectReady) PasosCtx.setCurrentStep(3)
    PasosCtx.setAspect({
      id,
      name
    })
    PasosCtx.setElementAspectName(name)
    PasosCtx.setElementAspectType(type)
    PasosCtx.setShowElements(true)

    dispatch(getAllElementsAssocietedToAspect(id))

  }

  // TODO: Asignar requerimientos desde 
  // TODO: el duck al state para el drag and drop
  useEffect(() => {
    if(aspects_duck.length === 0 && requirements_duck.length > 0) {
      PasosCtx.setCurrentStep(2)
      PasosCtx.setShowAspects(true)
      PasosCtx.setShowElements(false)
      PasosCtx.setShowLoadWork(false)
    }else if(aspects_duck.length === 0 && requirements_duck.length === 0) {
      PasosCtx.setCurrentStep(1)
      PasosCtx.setShowAspects(false)
      PasosCtx.setShowElements(false)
      PasosCtx.setShowLoadWork(false)
    }
    updateAspectos(aspects_duck)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspects_duck, requirements_duck])

  return (
    PasosCtx.showAspects && (
        <Col span={6}>
            <div className="App" style={{width:'100%'}}>
                <header className="App-header">
                    <h2>Aspects</h2>
                </header>
                
                <Row>
                    <Col span={12}>
                        <Col span={24}>
                          <Input style={{ width: '100%' }} value={aspecto.name} onChange={handleKeep} />
                        </Col>
                        <Col span={24} style={{ display: 'flex' }}>
                          <Button onClick={handleAdd} type="primary">Add</Button>
                        </Col>
                    </Col>
                    <Col span={8}>
                      <Select defaultValue="--Select an Option--" value={type} onChange={handleKeepType} style={{ width: "100%" }}>
                        <Option value="--Select a Project--">--Select an Option--</Option>
                        <Option value='COST'>COST</Option>
                        <Option value='BENEFIT'>BENEFIT</Option>
                      </Select>
                    </Col>

                </Row>
                

                <br/>
                <br/>

                {
                    aspectos && aspectos.length === 0 ?
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{position:"absolute", width:"300px"}} />

                        :

                    <div style={{display:'flex', flexDirection:'row'}}>
                      <h1 style={{textOrientation:'upright', writingMode:'vertical-lr'}}>↑Priority</h1>

                    
                    <DragDropContext onDragEnd={handleOnDragEnd} >
                        <Droppable droppableId="aspectos">
                        {(provided, snapshot) => (
                          <ul className="aspect" {...provided.droppableProps} ref={provided.innerRef} style={{width:'65%'}}>
                            {aspectos && aspectos.map(({id, name, type, countElements}, index) => {
                              return (
                                <Draggable key={id} draggableId={id.toString()} index={index}>
                                    {(provided) => (
                                      <DragNDropElement provided={provided} 
                                      snapshot={snapshot}
                                                        index={index}
                                                        id={id}
                                                        name={name}
                                                        type={type}
                                                        countElements={countElements}
                                                        handleMessage={handleMessage}/>
                                                        )}
                                </Draggable>
                                );
                              })}
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                    </DragDropContext>
                </div>
                }
            </div>
        </Col>
        )
        );
}

export default Aspectos