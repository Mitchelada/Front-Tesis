import React, { useContext, useState } from 'react';
import {
    PasosContext
} from './Pasos/Provider'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Empty,Button,Input, Col} from 'antd'
import '../styles/drag.css';



export const Aspectos = ()=> {

    const [aspectos, updateAspectos] = useState([]);
    const [aspecto, setAspecto] = useState({id:'' ,name:''})

    const PasosCtx = useContext(PasosContext)

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(aspectos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateAspectos(items);
    }

    const handleKeep = (e) =>{

        setAspecto({
            id: String(aspectos.length+1),
            name: e.target.value
        })

    }

    const handleAdd = () =>{

        if(aspecto.name === ""){
            return
        }

        updateAspectos([...aspectos, aspecto])
            setAspecto({
                id:'',
                name: ''
            })
            
    }

  const handleMessage = (id, name) =>{

    alert(`Tocaste el requerimiento ${id} de nombre ${name}`)

  }

  const handleReset =  () => {
    updateAspectos([])
  }
  
  return (
    PasosCtx.showAspects && (
        <Col span={5}>
            <div className="App" style={{width:'90%'}}>
                <header className="App-header">
                    <h2>Aspects</h2>
                </header>
                
                <Input style={{ width: '60%' }} value={aspecto.name} onChange={handleKeep} />
                <Button onClick={handleAdd} type="primary">Add</Button>
                <Button onClick={handleReset} type="primary" danger>Reset</Button>

                <br/>
                <br/>

                {
                    aspectos.length === 0 ?
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{position:"absolute", width:"300px"}} />

                        :

                    <DragDropContext onDragEnd={handleOnDragEnd} >
                        <Droppable droppableId="aspectos">
                        {(provided) => (
                            <ul className="requeriment" {...provided.droppableProps} ref={provided.innerRef} style={{width:'98%'}}>
                            {aspectos.map(({id, name}, index) => {
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

