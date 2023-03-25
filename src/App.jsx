import { BrowserRouter, RouterProvider, Route, Routes, Link, Navigate, } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import { AuthContext } from "./context/AuthContext";
import Spinner from "./components/Spinner";
import "./styles/ComponentStyles.css"
import "./styles/PageStyles.css"
import "./styles/Responsiveness.css"

const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const HomePage = lazy(() => import('./pages/HomePage'))

function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
