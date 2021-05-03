import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProjectsAction } from '../../../../redux/projects/duck'

export default () => {
  
  const dispatch = useDispatch()
  const projectsDuck = useSelector(store => store.projects.projects)

  useEffect(() => {
    dispatch(getProjectsAction())
  }, [])

  return projectsDuck

}