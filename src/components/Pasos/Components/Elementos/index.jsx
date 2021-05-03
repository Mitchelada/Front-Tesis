import React, { useContext, useEffect, useState } from 'react'
import {
  PasosContext
} from '../../Provider'

import { useDispatch, useSelector } from 'react-redux'
import { addElement, deleteElement } from '../../../../redux/elements/duck'
import { getAllAspectsAssocietedToProject } from '../../../../redux/aspects/duck'

import { Input, Select, Button, Table, Space, Row, Col, Popconfirm  } from 'antd';
import Submit from '../Submit'

import helpers from '../../../../helpers'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined'
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined'

const { Option } = Select;
const { Column } = Table;

let auxiliar = 0

const Elementos = () => {

  helpers.handleShowLoadWork()
  
  const [priority, setPriority] = useState("");
  const [nombre, setNombre] = useState("");
  const elements_duck = useSelector(state => state.elements.elements)
  
  const dispatch = useDispatch()
  const PasosCtx = useContext(PasosContext)

  // TODO: onChange input para agregar elemento
  const handleChange = (e) => {
      setNombre(e.target.value)
  }

  // TODO: onChange select priority para agregar requerimiento
  const handlePriority = (value)=>{
      setPriority(value)
  }

  // TODO: agregar elemento
  const handleAdd = () =>{

    const key = `${PasosCtx.aspect.name.replace(/ /g,'_')}_${PasosCtx.aspect.id}`

    if(Object.keys(PasosCtx.elements).length === 0) {
      PasosCtx.setElements({
        ...PasosCtx.elements,
        [key]: [
          {
            id:auxiliar+1,
            name: nombre,
            priority,
            aspect: PasosCtx.aspect.name
          }
        ]
      })
    }else if(PasosCtx.elements[key] === undefined) {
      PasosCtx.setElements({
        ...PasosCtx.elements,
        [key]: [
          {
            id:auxiliar+1,
            name: nombre,
            priority,
            aspect: PasosCtx.aspect.name
          }
        ]
      })
    }else{

      PasosCtx.setElements({
        ...PasosCtx.elements,
        [key]: [
          ...PasosCtx.elements[key],
          {
            id:auxiliar+1,
            name: nombre,
            priority,
            aspect: PasosCtx.aspect.name
          }
        ]
      })
    }

    const data = {
      name: nombre,
      priority,
      aspectId: +PasosCtx.aspect.id
    }

    dispatch(addElement(data))
    dispatch(getAllAspectsAssocietedToProject(PasosCtx.projectId))

    setPriority("")
    setNombre("")
    
  }

  // TODO: eliminar elemento
  const handleDeleteElement = async (id) => {
    const data = {
      id,
      aspectId: PasosCtx.aspect.id
    }
    
    dispatch(deleteElement(data))
    dispatch(getAllAspectsAssocietedToProject(PasosCtx.projectId))
  }

  // TODO: Asignar elementos desde 
  // TODO: el duck al state para el drag and drop
  useEffect(() => { 
    elements_duck.forEach((item, key) => {
      const keyElement = `${item.Aspect.name.replace(/ /g,'_')}_${item.Aspect.id}`
      item.aspect = item.Aspect.name
      PasosCtx.setElements({
        ...PasosCtx.elements,
        [keyElement]: [
          { ...item }
        ]
      })
    })
    PasosCtx.setDatasource(elements_duck)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements_duck])

  return (
    PasosCtx.showElements && (
      <Col span={9}>
        <Row>
          <Col span={24}>

            <div>
              <header className="App-header">
                
                {
                  PasosCtx.elementAspectName.length === 0 ? (
                    <h2>Elements</h2>
                  ) : (
                  <h2>Elements of {PasosCtx.elementAspectName} 
                  {
                    PasosCtx.elementAspectType === 'BENEFIT' ? (
                      <PlusSquareOutlined style={{ marginLeft: '10px', color: 'green'}} />
                      ) : (
                      <MinusCircleOutlined style={{ marginLeft: '10px', color: 'red'}} />
                    ) 
                  }
                  </h2>
                  )
                }
              
              </header>
              <Input.Group compact>
                  <Input style={{ width: '40%' }} value={nombre} onChange={handleChange} />
                  <Select style={{ width: '25%' }} value={priority}  onChange={handlePriority}> {/*Se crea mediante value no por evento*/} 
                      <Option value="">---Choose Priority---</Option>
                      <Option value="HIGH" >Alta</Option>
                      <Option value="MEDIUM">Media</Option>
                      <Option value="LOW">Baja</Option>
                  </Select>
              </Input.Group>


              <Button onClick={handleAdd} type="primary" style={{top:"8px"}}>
                  Agregar
              </Button>

              <Table bordered="true" dataSource={PasosCtx.datasource} style={{ width: '95%', paddingTop:"18px" }} scroll={{ y: 450 }} pagination={false}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Priority" dataIndex="priority" key="priority" defaultSortOrder="ascend" />
                <Column title="Aspect" dataIndex="aspect" key="aspect" defaultSortOrder="ascend" />
                <Column
                    title="Action"
                    key="action"
                    width="15%"
                    render={(text, record) => (
                      <Space size="middle">
                        <Popconfirm title="Do you want to delete this elemento?"
                                    onConfirm={() => handleDeleteElement(record.id)}>
                          <Button icon={<DeleteOutlined/>} 
                                  type="danger">
                          </Button>
                        </Popconfirm>
                      </Space>
                    )}
                />
              </Table>

            </div>
          </Col>
          <Col span={24}>
            <Submit/> 
          </Col>

        </Row>
      </Col>
    )
  )
}

export default Elementos