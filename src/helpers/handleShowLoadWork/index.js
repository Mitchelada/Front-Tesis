import { useContext, useEffect, useState } from 'react'
import {
  PasosContext
} from '../../components/Pasos/Provider'
import { notification } from 'antd';
import { useSelector } from 'react-redux'

import axios from 'axios'

export default () => {

  const [showedNotification, setShowedNotification] = useState(false)

  const PasosCtx = useContext(PasosContext)
  const aspects_duck = useSelector(state => state.aspects.aspects)
  const elements_duck = useSelector(state => state.elements.elements)

  const openNotificationWithIcon = type => {
    notification[type]({
      key: PasosCtx.projectId,
      placement: 'bottomRight',
      message: 'Oh right!',
      description:
        `Your project ${PasosCtx.projectName} is ready to next step!`,
      duration: 0
    });
  };

  useEffect(() => {
    PasosCtx.setShowLoadWork(false)
    PasosCtx.setCurrentStep(3)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PasosCtx.aspects])

  // TODO: Asignar requerimientos desde 
  // TODO: el duck al state para el drag and drop
  useEffect(() => {
    
    const fx = async () => {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/aspect/countElements/related/${PasosCtx.projectId}`)

      if(response.data.countElements.length > 0) {
        const { data: { countElements: [ { elementsRelatedToAspects, totalAspects } ] } } = response

        console.log('elementsRelatedToAspects ', elementsRelatedToAspects)
        console.log('totalAspects ', totalAspects)

        if(elementsRelatedToAspects !== totalAspects) {
          PasosCtx.setShowLoadWork(false)
          setShowedNotification(false)
          PasosCtx.setProjectReady(false)
          PasosCtx.setCurrentStep(3)
          notification.destroy()
        }
        else if(elementsRelatedToAspects !== 0 && totalAspects !== 0 && (elementsRelatedToAspects === totalAspects)) {
          console.log('showedNotification ', showedNotification)
          if(showedNotification === false) {
            openNotificationWithIcon('success')
            PasosCtx.setProjectReady(true)
            setShowedNotification(true)
            PasosCtx.setCurrentStep(4)
          }
        }
        
      }
    }

    fx()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspects_duck, elements_duck, showedNotification])

  useEffect(() => {
    setShowedNotification(false)
    PasosCtx.setProjectReady(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PasosCtx.projectId])
}