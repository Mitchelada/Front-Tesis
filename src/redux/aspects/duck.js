import axios from 'axios'

const initData = {
  aspects: [],
  countElements: []
}

axios.defaults.headers.common = {'Authorization': `${localStorage.getItem('token')}`}
const { REACT_APP_ENDPOINT } = process.env

const GET_ALL_ASPECTS_ASSOCIETED_TO_PROJECT = "GET_ALL_ASPECTS_ASSOCIETED_TO_PROJECT"
const GET_ELEMENTS_COUNT_FROM_ASPECTS = "GET_ELEMENTS_COUNT_FROM_ASPECTS"

const aspectReducer = (state = initData, action) => {
  switch(action.type) {
    case GET_ALL_ASPECTS_ASSOCIETED_TO_PROJECT: {
      return {  ...state, aspects: action.payload }
    }

    default: {
      return state
    }
  }
}

export const getAllAspectsAssocietedToProject = (projectId) => async (dispatch, getState) => {
  try {

    const res = await axios.get(`${REACT_APP_ENDPOINT}/aspect/${projectId}`)

    dispatch({
      type: GET_ALL_ASPECTS_ASSOCIETED_TO_PROJECT,
      payload: res.data.allAspects
    })
  }catch(e) {
  }
}

export const getElementsCountFromAspects = (aspectId) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${REACT_APP_ENDPOINT}/aspect/countElements/${aspectId}`)

    dispatch({
      type: GET_ELEMENTS_COUNT_FROM_ASPECTS,
      payload: res.data.countElements[0],
      aspectId
    })
  }catch(e) {
  


  }
}

export const addAspect = (data) => async (dispatch, getState) => {
  try {
    await axios.post(`${REACT_APP_ENDPOINT}/aspect/add/${data.projectId}`, data)
    const responseGetAllAspectsAssociatedToProject = await axios.get(`${REACT_APP_ENDPOINT}/aspect/${data.projectId}`)

    dispatch({
      type: GET_ALL_ASPECTS_ASSOCIETED_TO_PROJECT,
      payload: responseGetAllAspectsAssociatedToProject.data.allAspects
    })
  }catch(e) {

  }
}

export const deleteAspect = (data) => async (dispatch, getState) => {
  try {
    await axios.delete(`${REACT_APP_ENDPOINT}/aspect/delete/${data.aspectId}`)
    const responseGetAllAspectsAssociatedToProject = await axios.get(`${REACT_APP_ENDPOINT}/aspect/${data.projectId}`)

    dispatch({
      type: GET_ALL_ASPECTS_ASSOCIETED_TO_PROJECT,
      payload: responseGetAllAspectsAssociatedToProject.data.allAspects
    })
  }catch(e) {

  }
}

export const updateAspectsWeight = (data) => async (dispatch, getState) => {
  try {
    await axios.put(`${REACT_APP_ENDPOINT}/aspect/update/${data.projectId}/${data.id}`, data)
    const responseGetAllAspectsAssociatedToProject = await axios.get(`${REACT_APP_ENDPOINT}/aspect/${data.projectId}`)

    dispatch({
      type: GET_ALL_ASPECTS_ASSOCIETED_TO_PROJECT,
      payload: responseGetAllAspectsAssociatedToProject.data.allAspects
    })
  }catch(e) {
  


  }
}

export default aspectReducer