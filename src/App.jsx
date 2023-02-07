import RegisterPage from "./pages/RegisterPage"
import LoginPage from './pages/LoginPage'
import HomePage from "./pages/HomePage"
import { BrowserRouter, RouterProvider, Route, Routes, Link, Navigate, } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

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
      {/* <div className="alert">This app is still in beta! Expect to see bugs here and there!</div> */}
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
    </BrowserRouter>
  )
}

export default App
