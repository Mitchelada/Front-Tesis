import axios from 'axios'

const initData = {
  projects: [],
  projects_ranking: [],
  aspects_and_elements: [],
  requirements: [],
  ehr: [],
  diagram_data: [],
  rankings: [],
  registerUser: {},
  loginUser: {},
  token: null,
  registerResponse: null,
  loginResponse: null
}

axios.defaults.headers.common = {'Authorization': `${localStorage.getItem('token')}`}
const { REACT_APP_ENDPOINT } = process.env

const REGISTER_USER = "REGISTER_USER"
const LOGIN_USER = "LOGIN_USER"
const GET_ALL_PROJECTS = "GET_ALL_PROJECTS"
const GET_ALL_PROJECTS_RANKING = "GET_ALL_PROJECTS_RANKING"
const GET_ASPECTS_AND_ELEMENTS_FROM_PROJECT = "GET_ASPECTS_AND_ELEMENTS_FROM_PROJECT"
const GET_REQUIREMENTS_FROM_PROJECT = "GET_REQUIREMENTS_FROM_PROJECT"
const GET_EHR = "GET_EHR"
const GET_DIAGRAM_DATA = "GET_DIAGRAM_DATA"
const GET_RANKINGS = "GET_RANKINGS"

const projectReducer = (state = initData, action) => {
  switch(action.type) {
    case REGISTER_USER: {
      console.log('action ', action)
      return {  
        ...state, 
        registerUser: action.payload, 
        token: action.token, 
        registerResponse: action.registerResponse 
      }
    }

    case LOGIN_USER: {
      console.log('action ', action)
      return {  
        ...state, 
        loginUser: action.payload, 
        token: action.token, 
        loginResponse: action.loginResponse 
      }
    }

    case GET_ALL_PROJECTS: {
      return {  ...state, projects: action.payload }
    }

    case GET_ALL_PROJECTS_RANKING: {
      return {  ...state, projects_ranking: action.payload }
    }

    case GET_RANKINGS: {
      return {  ...state, rankings: action.payload }
    }

    case GET_ASPECTS_AND_ELEMENTS_FROM_PROJECT: {
      return {  ...state, aspects_and_elements: action.payload }
    }

    case GET_REQUIREMENTS_FROM_PROJECT: {
      return {  ...state, requirements: action.payload }
    }

    case GET_EHR: {
      return {  ...state, ehr: action.payload }
    }

    case GET_DIAGRAM_DATA: {
      return {  ...state, diagram_data: action.payload }
    }

    default: {
      return state
    }
  }
}

export const loginUser = (values) => async (dispatch, getState) => {
  
  try {
    const res = await axios.post(`${REACT_APP_ENDPOINT}/project/login/user`, values)
    
    if(res.data.token) {
      localStorage.setItem('token', res.data.token)
    }

    dispatch({
      type: LOGIN_USER,
      payload: res.data.registerUser,
      loginResponse: res.data.loginResponse,
      token: res.data.token
    })

  }catch(e) {
  }
}

export const registerUser = (values) => async (dispatch, getState) => {
  
  try {
    const res = await axios.post(`${REACT_APP_ENDPOINT}/project/register/user`, values)
    
    console.log('[res]', res.data)

    if(res.data.token) {
      localStorage.setItem('token', res.data.token)
    }

    dispatch({
      type: REGISTER_USER,
      payload: res.data.registerUser,
      registerResponse: res.data.registerResponse,
      token: res.data.token
    })

  }catch(e) {
  }
}

export const getRanking = (projectId, aspects) => async (dispatch, getState) => {
  try {
    if(projectId !== null) {
      const res = await axios.get(`${REACT_APP_ENDPOINT}/project/get/ranking/${projectId}`)
      
      dispatch({
        type: GET_RANKINGS,
        payload: res.data.ranking
      })
    }else{
      dispatch({
        type: GET_RANKINGS,
        payload: []
      })
    }

  }catch(e) {
  }
}


export const addRanking = (data) => async (dispatch, getState) => {
  try {

    await axios.post(`${REACT_APP_ENDPOINT}/rankings/add`, data)

  }catch(e) {
  }
}

export const getEHR = (data, aspects) => async (dispatch, getState) => {
  try {
    const res = await axios.post(`${REACT_APP_ENDPOINT}/project/ehr`, data)
    
    const ehr = res.data.allEHR
    let aspectss = aspects

    
    ehr.forEach((item) => {
      aspectss.push({
        id: `e_${item.ElementId}:r_${item.RequirementId}`,
        source: `e_${item.ElementId}`,
        target: `r_${item.RequirementId}`,
        type: 'straight',
        style:{stroke: "black", strokeWidth:1.0}
      })
    })

    dispatch({
      type: GET_EHR,
      payload: aspectss
    })

  }catch(e) {
  }
}


export const getAspectsAndElementsFromProject = (projectId) => async (dispatch, getState) => {
  try {

    console.log('projectId duck ', projectId)
    let elements = []
    const resAspectsAndElements = await axios.get(`${REACT_APP_ENDPOINT}/project/aspects/elements/${projectId}`)
    const resRequirements = await axios.get(`${REACT_APP_ENDPOINT}/project/requirements/${projectId}`)

    console.log('resAspectsAndElements ', resAspectsAndElements)

    const { data: { allAspectsAndElementsFromProject }} = resAspectsAndElements
    const { data: { allRequirementsFromProject }} = resRequirements

    console.log('[allRequirementsFromProject]', allRequirementsFromProject)
    console.log('allAspectsAndElementsFromProject ', allAspectsAndElementsFromProject)

    if(allAspectsAndElementsFromProject.length === 0) {
      dispatch({
        type: GET_DIAGRAM_DATA,
        payload: {}
      })
    }else{
      for await (let item of allAspectsAndElementsFromProject) {
        elements.push(item.element_id)
      }
  
      const data = {
        elements
      }
  
      const resEHR = await axios.post(`${REACT_APP_ENDPOINT}/project/ehr`, data)
  
      const { data: { allEHR }} = resEHR
  
      let payload = {
        allAspectsAndElementsFromProject,
        allRequirementsFromProject,
        allEHR
      };
  
      dispatch({
        type: GET_DIAGRAM_DATA,
        payload
      })
    }

  }catch(e) {
  }
}

export const getRequirementsFromProject = (projectId) => async (dispatch, getState) => {
  try {

    const res = await axios.get(`${REACT_APP_ENDPOINT}/project/requirements/${projectId}`)

    dispatch({
      type: GET_REQUIREMENTS_FROM_PROJECT,
      payload: res.data.allRequirementsFromProject
    })
  }catch(e) {
  }
}

export const getProjectsAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${REACT_APP_ENDPOINT}/project/all`)
    dispatch({
      type: GET_ALL_PROJECTS,
      payload: res.data.allProjects
    })
  }catch(e) {
    
  }
}

export const getProjectsRankingAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${REACT_APP_ENDPOINT}/project/ranking/all`)

    dispatch({
      type: GET_ALL_PROJECTS_RANKING,
      payload: res.data.allProjects
    })
  }catch(e) {
    
  }
}

export const addProjectAction = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(`${REACT_APP_ENDPOINT}/project/add`, data)
    const responseGetAllProjects = await axios.get(`${REACT_APP_ENDPOINT}/project/all`)

    dispatch({
      type: GET_ALL_PROJECTS,
      payload: responseGetAllProjects.data.allProjects
    })
  }catch(e) {
    
  }
}

export const deleteProjectAction = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.put(`${REACT_APP_ENDPOINT}/project`, data)
    const responseGetAllProjects = await axios.get(`${REACT_APP_ENDPOINT}/project/all`)

    dispatch({
      type: GET_ALL_PROJECTS,
      payload: responseGetAllProjects.data.allProjects
    })
  }catch(e) {
    
  }
}

export default projectReducer