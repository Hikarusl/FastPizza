import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router'
import type {FC, ReactElement} from "react";

const MyError: FC = (): ReactElement =>  {
  const navigate = useNavigate()
  const error = useRouteError()

  let message: string

  if (isRouteErrorResponse(error)) {
    message = error.data || error.statusText
  } else if (error instanceof Error) {
    message = error.message
  } else {
    message = 'An unexpected error occurred'
  }
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  )
}

export default MyError
