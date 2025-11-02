import { useRouteError, isRouteErrorResponse } from 'react-router'
import type { FC, ReactElement } from 'react'
import LinkButton from './LinkButton'

const MyError: FC = (): ReactElement => {
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
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  )
}

export default MyError
