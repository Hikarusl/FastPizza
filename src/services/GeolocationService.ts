import type { FetchAddressResult, Position } from '../features/user/storeTypes.ts'
import { getAddress } from './apiGeocoding.ts'

export class GeolocationService {
  static async getPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        err => reject(new Error(`Geolocation failed: ${err.message}`))
      )
    })
  }

  static async fetchAddress(): Promise<FetchAddressResult> {
    const position = await GeolocationService.getPosition()
    const addressObj = await getAddress(position)

    const address = `${addressObj?.locality ?? ''}, ${addressObj?.city ?? ''} ${addressObj?.postcode ?? ''}, ${addressObj?.countryName ?? ''}`

    return { position, address }
  }
}
