import axios from 'axios'


const initData = {
  elements: []
}

axios.defaults.headers.common = {'Authorization': `${localStorage.getItem('token')}`}
const { REACT_APP_ENDPOINT } = process.env

const GET_ALL_ELEMENTS_ASSOCIETED_TO_ASPECT = "GET_ALL_ELEMENTS_ASSOCIETED_TO_ASPECT"

const elementReducer = (state = initData, action) => {
  switch(action.type) {
    case GET_ALL_ELEMENTS_ASSOCIETED_TO_ASPECT: {
      return { ...state, elements: action.payload }
    }

    default: {
      return state
    }
  }
}

export const getAllElementsAssocietedToAspect = (aspectId) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${REACT_APP_ENDPOINT}/element/${aspectId}`)

    dispatch({
      type: GET_ALL_ELEMENTS_ASSOCIETED_TO_ASPECT,
      payload: res.data.allElements
    })
  }catch(e) {
    
  }
}

export const addElement = (data) => async (dispatch, getState) => {
  try {
    await axios.post(`${REACT_APP_ENDPOINT}/element/add/${data.aspectId}`, data)
    const responseGetAllElementsAssociatedToAspect = await axios.get(`${REACT_APP_ENDPOINT}/element/${data.aspectId}`)

    dispatch({
      type: GET_ALL_ELEMENTS_ASSOCIETED_TO_ASPECT,
      payload: responseGetAllElementsAssociatedToAspect.data.allElements
    })
  }catch(e) {
    
  }
}

export const deleteElement = (data) => async (dispatch, getState) => {
  try {
    await axios.delete(`${REACT_APP_ENDPOINT}/element/delete/${data.id}`)
    const responseGetAllElementsAssociatedToAspect = await axios.get(`${REACT_APP_ENDPOINT}/element/${data.aspectId}`)

    dispatch({
      type: GET_ALL_ELEMENTS_ASSOCIETED_TO_ASPECT,
      payload: responseGetAllElementsAssociatedToAspect.data.allElements
    })
  }catch(e) {
    
  }
}

export default elementReducer