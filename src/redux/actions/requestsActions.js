export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS'
export const FETCH_REQUESTS_FAILED = 'FETCH_REQUESTS_FAILED'

export const REQUEST_PENDING = 'REQUEST_PENDING'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILED = 'REQUEST_FAILED'

const BASE_URL = 'http://localhost:3000/api'

export const fetchRequests = () => {
  return async dispatch => {
    try {
      let response = await fetch(`${BASE_URL}/requests`)
      let requests = await response.json()
      dispatch({
        type: FETCH_REQUESTS_SUCCESS,
        payload: requests
      })
    } catch(err) {
      dispatch({
        type: FETCH_REQUESTS_FAILED,
        payload: err
      })
    }
  }
}

export const requestWalk = (newRequest, history) => {
  return async(dispatch) => {
    try {
      dispatch({type: REQUEST_PENDING})
      let response = await fetch(`${BASE_URL}/requests`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': 'Authorization, Content-Type'
        },
        credentials: 'include',
        body: JSON.stringify(newRequest)
      })
      .then ((response) => {
        if (response.status < 300) {
          return response;
        } else {
          throw new Error(response.statusText);
        }
      })
      let reqObject = await response.json()
      dispatch({
        type: REQUEST_SUCCESS,
        payload: reqObject
      })
      history.push('/user_index')
    } catch(err) {
      dispatch({
        type: REQUEST_FAILED,
        payload: err
      })
    }
  }
}