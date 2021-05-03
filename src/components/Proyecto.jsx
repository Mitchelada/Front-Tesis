import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectsAction, addProjectAction, deleteProjectAction } from '../redux/projects/duck'

import { Input, Button, Table, Space, Popconfirm  } from 'antd';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'

import services from './Proyectos/services'

const { Column } = Table;

export const Proyecto = () => {

    const [name, setName] = useState('')
    
    const dispatch = useDispatch()
    const proyectos = useSelector(store => store.projects.projects)
    
    services.getAllProjects()

    const handleChange = (e) => {
        setName(e.target.value)
    }
    
    return (
        <div>
            <Input.Group compact>
                <Input style={{ width: '15%'}} 
                       value={name} 
                       onChange={handleChange} />
            </Input.Group>

            <Button onClick={() => dispatch(addProjectAction({ name }))} 
                    type="primary" 
                    style={{
                        top: '-32px',
                        left: '280px'
                    }}>
                Agregar
            </Button>

            <Table bordered="true" 
                   dataSource={proyectos} 
                   style={{ 
                       width: '85%', 
                       position:"absolute", 
                       paddingTop:"10px" 
                    }} 
                    scroll={{ 
                        y: 450 
                    }} 
                    pagination={false}>

                    <Column title="Name"
                            key="Name"
                            render={(text, record) => {
                                return (
                                    <Space size="middle" key={`name${record.id}`}>
                                        <p>{record.name}</p>
                                    </Space>
                                )
                            }}/>

                    <Column
                        title="Action"
                        key="Action"
                        render={(text, record) => (
                            <Space size="middle" key={`action${record.id}`}>
                                <Popconfirm title='Do you want to delete this item?' 
                                            okText='Si' 
                                            cancelText='No'
                                            onConfirm={() => dispatch(deleteProjectAction({ id: record.id }))}>
                                    <Button icon={<DeleteOutlined/>} 
                                            type="danger"></Button>
                                </Popconfirm>
                            </Space>
                        )}
                    />

            </Table>
        </div>
    )
}
