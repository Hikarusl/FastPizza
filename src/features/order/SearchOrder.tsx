import {type FormEvent, useState} from 'react'
import { useNavigate } from 'react-router'

const SearchOrder = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
    setQuery('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Search order #"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  )
}

export default SearchOrder
