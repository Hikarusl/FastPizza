import { type FormEvent, useState } from 'react'
import { type NavigateFunction, useNavigate } from 'react-router'

const SearchOrder = () => {
  const [query, setQuery] = useState<string>('')
  const navigate: NavigateFunction = useNavigate()

  function handleSubmit(event: FormEvent): void {
    event.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
    setQuery('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="serchOrder"
        placeholder="Search order №"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="focus:ring-opacity-50 w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-yellow-500 focus:outline-none sm:w-64 sm:focus:w-72"
      />
    </form>
  )
}

export default SearchOrder
