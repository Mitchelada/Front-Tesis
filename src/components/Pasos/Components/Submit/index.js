import React, { useContext } from 'react'
import {
  PasosContext
} from '../../Provider'

import { Button, Col, Popconfirm } from 'antd';

export default () => {

  const PasosCtx = useContext(PasosContext)

  return (
    PasosCtx.showLoadWork && (
      <Popconfirm title='Do you want to save this data?' 
                  okText='Yes' 
                  cancelText='No'
                  onConfirm={() => alert('Guardar datos')}>

        <Button style={{width:"100%", background: '#4CAF50', color: '#fff'}}>
          Verify
        </Button>
      </Popconfirm>
    )
  )
}