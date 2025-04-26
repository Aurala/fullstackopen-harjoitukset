import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    console.log('filter:', filter)
    dispatch(setFilter(filter))
  }

  const style = {
    marginBottom: 10,
    padding: 10
  }

  return (
    <div style={style}>
      filter: <input onChange={handleChange} />
    </div>
  )
}

export default Filter
