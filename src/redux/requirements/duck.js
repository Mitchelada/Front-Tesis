import axios from 'axios'

const initData = {
  requirements: [],
  loading: true
}

axios.defaults.headers.common = {'Authorization': `${localStorage.getItem('token')}`}
const { REACT_APP_ENDPOINT } = process.env

const GET_ALL_REQUIREMENTS_ASSOCIETED_TO_PROJECT = "GET_ALL_REQUIREMENTS_ASSOCIETED_TO_PROJECT"

const requirementReducer = (state = initData, action) => {
  switch(action.type) {
    case GET_ALL_REQUIREMENTS_ASSOCIETED_TO_PROJECT: {
      return {  ...state, requirements: action.payload, loading: false }
    }

    default: {
      return state
    }
  }
}

export const getAllRequirementsAssocietedToProject = (projectId) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${REACT_APP_ENDPOINT}/requirement/${projectId}`)
    dispatch({
      type: GET_ALL_REQUIREMENTS_ASSOCIETED_TO_PROJECT,
      payload: res.data.allRequirements
    })
  }catch(e) {
    
  }
}

export const addRequirement = (data) => async (dispatch, getState) => {
  try {
    await axios.post(`${REACT_APP_ENDPOINT}/requirement/add`, data)
    const responseGetAllRequirementsAssociatedToProject = await axios.get(`${REACT_APP_ENDPOINT}/requirement/${data.projectId}`)

    dispatch({
      type: GET_ALL_REQUIREMENTS_ASSOCIETED_TO_PROJECT,
      payload: responseGetAllRequirementsAssociatedToProject.data.allRequirements
    })
  }catch(e) {
    
  }
}

export const deleteRequirement = (data) => async (dispatch, getState) => {
  try {
    await axios.delete(`${REACT_APP_ENDPOINT}/requirement/delete/${data.requirementId}`)
    const responseGetAllRequirementsAssociatedToProject = await axios.get(`${REACT_APP_ENDPOINT}/requirement/${data.projectId}`)

    dispatch({
      type: GET_ALL_REQUIREMENTS_ASSOCIETED_TO_PROJECT,
      payload: responseGetAllRequirementsAssociatedToProject.data.allRequirements
    })
  }catch(e) {
    
  }
}

export const updateRequirementsWeight = (data) => async (dispatch, getState) => {
  try {
    await axios.post(`${REACT_APP_ENDPOINT}/requirement/update/${data.projectId}/${data.id}`, data)
    const responseGetAllRequirementsAssociatedToProject = await axios.get(`${REACT_APP_ENDPOINT}/requirement/${data.projectId}`)

    dispatch({
      type: GET_ALL_REQUIREMENTS_ASSOCIETED_TO_PROJECT,
      payload: responseGetAllRequirementsAssociatedToProject.data.allRequirements
    })
  }catch(e) {
    
  }
}

export default requirementReducer