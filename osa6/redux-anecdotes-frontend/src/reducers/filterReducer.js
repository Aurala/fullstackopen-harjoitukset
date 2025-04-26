import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filter = action.payload
      console.log('Setting a filter:', filter)
      return filter
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
