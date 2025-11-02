export class ApiError extends Error {
  status: number
  details?: unknown
  constructor(status: number, message: string, details?: unknown) {
    super(message)
    this.status = status
    this.details = details
  }
}

export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  const text = await res.text()
  const payload = text ? JSON.parse(text) : null
  if (!res.ok) throw new ApiError(res.status, payload?.message || res.statusText, payload)
  return payload as T
}
