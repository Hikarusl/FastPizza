import Button from '../../ui/Button.tsx'
import { useUserLocation } from '../../hooks/useUserLocation.ts'

const UserLocationButton = () => {
  const { getLocation, status } = useUserLocation()

  return (
    <Button type="small" onClick={getLocation} disabled={status === 'loading'}>
      Get Position
    </Button>
  )
}

export default UserLocationButton
