import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProjectsAction } from '../../../../redux/projects/duck'

export default () => {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getProjectsAction())
  }, [])

}