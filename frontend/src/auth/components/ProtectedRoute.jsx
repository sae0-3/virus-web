import { useCheckSesion } from '@auth/hooks'
import { Loading } from '@common/components'
import { Navigate, Outlet } from 'react-router-dom'


export const ProtectedRoute = ({ redirectPath = '/iniciar-sesion' }) => {
  const [isAuthenticated, isLoading] = useCheckSesion()

  return isLoading ? (
    <Loading />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} replace />
  )
}
