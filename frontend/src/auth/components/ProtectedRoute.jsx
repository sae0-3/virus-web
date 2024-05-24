import { useCheckSesion } from '@auth/hooks'
import { Navigate, Outlet } from 'react-router-dom'


export const ProtectedRoute = ({ redirectPath = '/iniciar-sesion' }) => {
  const [isAuthenticated, isLoading] = useCheckSesion()

  return isLoading ? (
    <></>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} replace />
  )
}
