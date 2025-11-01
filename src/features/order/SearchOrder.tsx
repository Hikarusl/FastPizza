import {type FormEvent, useState} from 'react'
import {type NavigateFunction, useNavigate} from 'react-router'

const SearchOrder = () => {
  const [query, setQuery] = useState<string>('')
  const navigate:NavigateFunction = useNavigate()

  function handleSubmit(event: FormEvent):void {
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
        className="rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28
        focus:outline-none focus:ring focus:ring-yellow-500"
      />
    </form>
  )
}

export default SearchOrder
