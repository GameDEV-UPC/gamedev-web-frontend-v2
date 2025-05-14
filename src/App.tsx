import "./App.css";
import Home from "./pages/Home/Home.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/AuthProvider.tsx";
import { ProtectedRoute } from "./hooks/ProtectedRoute.tsx";
import Navbar from "./components/NavBar/NavBar.tsx";
import MyStats from "./pages/MyStats/MyStats.tsx";
import About from "./pages/About/About.tsx";
import Login from "./pages/log/Login/Login.tsx";
import SignUp from "./pages/log/Signup/Signup.tsx";
import Main from "./pages/Main/Main.tsx";
import Tutorial from "./pages/Tutorial/Tutorial.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <MainContent />
        </div>
      </Router>
    </AuthProvider>
  );
}
function MainContent() {
  const location = useLocation();

  function shouldShowNavbar(pathname: string) {
    const showNavbarPaths = ["/main", "/mystats", "/about"];
    return showNavbarPaths.includes(pathname);
  }

  return (
    <>
      {shouldShowNavbar(location.pathname) && <Navbar />}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Rutas protegidas */}
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mystats"
          element={
            <ProtectedRoute>
              <MyStats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="/tutorial" element={<Tutorial />} />

        {/* Ruta comodín */}

        <Route path="/" element={<RedirectToProperPage />} />
        <Route path="*" element={<RedirectToProperPage />} />
      </Routes>
    </>
  );
}

function RedirectToProperPage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // o un spinner opcional
  console.log("isAuthenticated" + localStorage.getItem("user"));
  return isAuthenticated ? (
    <Navigate to="/main" replace />
  ) : (
    <Navigate to="/home" replace />
  );
}

export default App;
