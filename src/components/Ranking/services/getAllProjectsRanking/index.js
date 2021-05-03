import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProjectsRankingAction } from '../../../../redux/projects/duck'

export default () => {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log('hla')
    dispatch(getProjectsRankingAction())
  }, [])

}