import React, { useState, useContext } from 'react';
import {
  PasosContext
} from './Pasos/Provider'

import {Empty,Button,Input, Col} from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/drag.css';


export const DragDrop = ()=> {
  const [requirements, updateRequirements] = useState([]);
  const [requirement, setRequirement] = useState({id:'' ,name:''})

  const PasosCtx = useContext(PasosContext)

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(requirements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateRequirements(items);
  }
  const handleKeep = (e) =>{

    setRequirement({
        id: String(requirements.length+1),
        name: e.target.value
    })

  }

  const handleAdd = () =>{
      if(requirement.name === ""){
        return 
      }
      
      updateRequirements([...requirements, requirement])
      setRequirement({
          id:'',
          name: ''
      })
            
  }

  const handleMessage = (id, name) =>{

    alert(`Tocaste el requerimiento ${id} de nombre ${name}`)

  }

  const handleReset =  () => {
    updateRequirements([])
  }

  return (
    PasosCtx.showDragNDrop && (

      <Col span={5}>
        <div className="App" style={{width:'90%'}}>
          <header className="App-header">
            <h2>Order Requirements</h2>
          </header>
        
          <Input style={{ width: '60%' }} value={requirement.name} onChange={handleKeep} />
          <Button onClick={handleAdd} type="primary">Add</Button>
          <Button onClick={handleReset} type="primary" danger>Reset</Button>

        <br/>
        <br/>
        {
          requirements.length===0 ?
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{position:"absolute", width:"300px"}}/>
            :
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="requirements">
              {(provided) => (
                <ul className="requirement" {...provided.droppableProps} ref={provided.innerRef} style={{width:'98%'}}>
                  {requirements.map(({id, name}, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick= { ()=> handleMessage(id, name)}>
                            <p>
                              { name }
                            </p>
                          </li>
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

