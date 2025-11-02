import { type FormEvent, useState } from 'react'
import Button from '../../ui/Button.tsx'
import { updateName } from './userSlice.ts'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

function CreateUser() {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent): void {
    e.preventDefault()

    if (!username) return
    dispatch(updateName(username))
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="input mb-8 w-72"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  )
}

export default CreateUser
