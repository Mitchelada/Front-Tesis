import React, { createContext, useState } from 'react'

export const PasosContext = createContext({})

export const PasosProvider = ({ children }) => {

  const [datasource, setDatasource] = useState([])
  const [elementAspectType, setElementAspectType] = useState('')
  const [elementAspectName, setElementAspectName] = useState('')
  const [elements, setElements] = useState({})
  const [aspectsCount, setAspectsCount] = useState([])
  const [countAspectsWithElements, setCountAspectsWithElements] = useState([])
  const [aspects, setAspects] = useState([])
  const [aspect, setAspect] = useState({ id: null, name: null })
  const [currentStep, setCurrentStep] = useState(0)
  const [showDragNDrop, setShowDragNDrop] = useState(false)
  const [showAspects, setShowAspects] = useState(false)
  const [showElements, setShowElements] = useState(false)
  const [showLoadWork, setShowLoadWork] = useState(false)

  const [projectReady, setProjectReady] = useState(false)
  const [projectId, setProjectId] = useState(null)
  const [projectName, setProjectName] = useState('')

  return (
    <PasosContext.Provider value={{
      datasource,
      elementAspectType,
      elementAspectName,
      elements,
      aspectsCount,
      countAspectsWithElements,
      aspects,
      aspect,
      currentStep,
      showDragNDrop,
      showAspects,
      showElements,
      showLoadWork,
      projectReady,
      projectId,
      projectName,
      setDatasource,
      setAspects,
      setElementAspectType,
      setElementAspectName,
      setElements,
      setAspectsCount,
      setCountAspectsWithElements,
      setAspect,
      setCurrentStep,
      setShowDragNDrop,
      setShowAspects,
      setShowElements,
      setShowLoadWork,
      setProjectReady,
      setProjectId,
      setProjectName
    }}>
      {children}
    </PasosContext.Provider>
  )
}