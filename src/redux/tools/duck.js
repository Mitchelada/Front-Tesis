import axios from 'axios'

const initData = {
  projects: []
}

axios.defaults.headers.common = {'Authorization': `${localStorage.getItem('token')}`}
const { REACT_APP_ENDPOINT } = process.env

const GET_ALL_PROJECTS = "GET_ALL_PROJECTS"

const toolsReducer = (state = initData, action) => {
  switch(action.type) {
    default: {
      return {  ...state }
    }
  }
}

export const addRelation = (data) => async (dispatch, getState) => {

  console.log('data ', data)
  try {
    await axios.post(`${REACT_APP_ENDPOINT}/tools/add/${data.projectId}`, data)
  }catch(e) {
  }
}

export const removeRelation = (data) => async (dispatch, getState) => {

  try {
    await axios.post(`${REACT_APP_ENDPOINT}/tools/delete/${data.id}`, data)
  }catch(e) {
  }
}


export default toolsReducer