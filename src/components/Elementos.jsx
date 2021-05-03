import React, { useContext, useState } from 'react'
import {
  PasosContext
} from './Pasos/Provider'

import { Input, Select, Button, Table, Space, Col  } from 'antd';

const { Option } = Select;
const { Column } = Table;

let auxiliar = 0

export const Elementos = () => {

  const [elementos, setElementos] = useState([]);
  const [priority, setPriority] = useState("");
  const [nombre, setNombre] = useState("");

  const PasosCtx = useContext(PasosContext)
  
  const handleChange = (e) => {
      setNombre(e.target.value)
  }

  const handlePriority = (value)=>{
      setPriority(value)
  }

  const handleAdd = () =>{

      setElementos([...elementos,{
          id:auxiliar+1,
          name: nombre,
          priority
      }])

      setPriority("")
      setNombre("")
  }
  
  return (
    PasosCtx.showElements && (
      <Col span={9}>
        <div>
          <header className="App-header">
              <h2>Elements</h2>
          </header>
          <Input.Group compact>
              <Input style={{ width: '40%' }} value={nombre} onChange={handleChange} />
              <Select style={{ width: '25%' }} value={priority}  onChange={handlePriority}> {/*Se crea mediante value no por evento*/} 
                  <Option value="">---Elige Prioridad---</Option>
                  <Option value="Alta" >Alta</Option>
                  <Option value="Media">Media</Option>
                  <Option value="Baja">Baja</Option>
              </Select>
          </Input.Group>


          <Button onClick={handleAdd} type="primary" style={{top:"8px"}}>
              Agregar
          </Button>

          <Table bordered="true" dataSource={elementos} style={{ width: '95%', position:"absolute", paddingTop:"18px" }} scroll={{ y: 450 }} pagination={false}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column title="Priority" dataIndex="priority" key="priority" defaultSortOrder="ascend" />
                  <Column title="Aspect" dataIndex="aspect" key="aspect" defaultSortOrder="ascend" />
                  <Column
                      title="Action"
                      key="action"
                      width="15%"
                      render={(text, record) => (
                          <Space size="middle">
                          <p>Delete</p>
                          </Space>
                      )}
                  />
          </Table>
        </div>
      </Col>
    )
  )
}
