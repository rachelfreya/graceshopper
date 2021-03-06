import axios from 'axios'
import { browserHistory } from 'react-router'

// CONSTANTS
const AUTHENTICATED = 'AUTHENTICATED'

// ACTIONS
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

// ACTION CREATORS
export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => browserHistory.replace('/products'))
      .catch(() => alert('Invalid login'))
      .then(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

// REDUCER
const reducer = (state = null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

export default reducer
