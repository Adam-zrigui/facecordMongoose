import {Routes, Route, Outlet, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import useAuthContext from './components/context/authContext'
function App() {
  const Home = lazy(() => import('@/components/pages/Home'))
  const Notfound = lazy(() => import('@/components/pages/NotFound'))
  const Login = lazy(() => import('@/components/pages/auth/login'))
  const Register = lazy(() => import('@/components/pages/auth/Register'))
  const Loading = lazy(() => import('@/components/pages/Loading'))
    const { isAuthenticated }  = useAuthContext() 
    const ProtectedRoutes = () => (isAuthenticated ? <Outlet /> : <Navigate to='/login' />)
    const PublicRoutes = () => (!isAuthenticated ? <Outlet /> : <Navigate to='/' />)
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Suspense>
    </>
  )
}
export default App