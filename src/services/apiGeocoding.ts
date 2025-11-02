import type { Position } from '../features/user/storeTypes.ts'

export interface BigDataCloudResponse {
  locality?: string
  city?: string
  postcode?: string
  countryName?: string
}

export async function getAddress({ latitude, longitude }: Position): Promise<BigDataCloudResponse> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  )
  if (!res.ok) throw Error('Failed getting address')

  return (await res.json()) as BigDataCloudResponse
}
