const initialState = ''

const setFilter = (filterText) => {
  console.log('Setting filter:', filterText)
  return {
    type: 'SET',
    payload: filterText
  }
}

const filterReducer = (state = initialState, action) => {
  console.log('state now:', state)
  console.log('action:', action)

  switch (action.type) {
    case 'SET': {
      return action.payload
    }
    default: return state
  }
}

export { filterReducer as default, setFilter }
