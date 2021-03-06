import Swal from 'sweetalert2'

export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS'
export const FETCH_REQUESTS_FAILED = 'FETCH_REQUESTS_FAILED'

export const REQUEST_PENDING = 'REQUEST_PENDING'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILED = 'REQUEST_FAILED'

export const ACCEPT_REQUEST_PENDING = 'ACCEPT_REQUEST_PENDING'
export const ACCEPT_REQUEST_SUCCESS = 'ACCEPT_REQUEST_SUCCESS'
export const ACCEPT_REQUEST_FAILED = 'ACCEPT_REQUEST_FAILED'

export const DECLINE_REQUEST_PENDING = 'DECLINE_REQUEST_PENDING'
export const DECLINE_REQUEST_SUCCESS = 'DECLINE_REQUEST_SUCCESS'
export const DECLINE_REQUEST_FAILED = 'DECLINE_REQUEST_FAILED'

const BASE_URL = process.env.REACT_APP_API_URL

export const fetchRequests = () => {
  return async dispatch => {
    try {
      let response = await fetch(`${BASE_URL}/requests`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': 'Authorization, Content-Type',
          // adding Authorization to fetch all requests
          'Authorization': 'Bearer: ' + window.localStorage.getItem('token')
        },
        credentials: 'include',
      })
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
          'Access-Control-Request-Headers': 'Authorization, Content-Type',
          // adding Authorization to create request
          'Authorization': 'Bearer: ' + window.localStorage.getItem('token')
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
      let responseObject = await response.json()
      dispatch({
        type: REQUEST_SUCCESS,
        payload: responseObject
      })
      history.push('/user_index')
      Swal({
        title: "Walk Requested!",
        text: "Now, just wait for confirmation from the closest walker available...",
        type: "success",
        confirmButtonText: "ok"
      })
    } catch(err) {
      dispatch({
        type: REQUEST_FAILED,
        payload: err
      })
    }
  }
}

export const walkerAcceptsReq = (acceptedRequest, history) => {
  return async(dispatch) => {
    try {
      dispatch({type: ACCEPT_REQUEST_PENDING})
      let response = await fetch(`${BASE_URL}/requests/${acceptedRequest.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': 'Authorization, Content-Type',
          // adding Authorization to update request
          'Authorization': 'Bearer: ' + window.localStorage.getItem('token')
        },
        credentials: 'include',
        body: JSON.stringify(acceptedRequest)
      })
      .then ((response) => {
        if (response.status < 300) {
          return response;
        } else {
          throw new Error(response.statusText);
        }
      })
      let responseObject = await response.json()
      dispatch({
        type: ACCEPT_REQUEST_SUCCESS,
        payload: responseObject
      })
    } catch(err) {
      dispatch({
        type: ACCEPT_REQUEST_FAILED,
        payload: err
      })
    }
  }
}

export const walkerDeclinesReq = (declinedRequest, history) => {
  return async(dispatch) => {
    try {
      dispatch({type: DECLINE_REQUEST_PENDING})
      let response = await fetch(`${BASE_URL}/requests/${declinedRequest.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': 'Authorization, Content-Type',
          // adding Authorization to update request
          'Authorization': 'Bearer: ' + window.localStorage.getItem('token')
        },
        credentials: 'include',
        body: JSON.stringify(declinedRequest)
      })
      .then ((response) => {
        if (response.status < 300) {
          return response;
        } else {
          throw new Error(response.statusText);
        }
      })
      let responseObject = await response.json()
      dispatch({
        type: DECLINE_REQUEST_SUCCESS,
        payload: {
          requestId: declinedRequest.id
        }
      })
    } catch(err) {
      dispatch({
        type: DECLINE_REQUEST_FAILED,
        payload: err
      })
    }
  }
}
