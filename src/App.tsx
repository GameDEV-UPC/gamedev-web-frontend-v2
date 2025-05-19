import "./App.css";
import Home from "./pages/Home/Home.tsx";
import { AnimatePresence, motion } from "framer-motion";
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
import Leave from "./pages/Tutorial/Leave.tsx";

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
    const showNavbarPaths = [
      "/main",
      "/mystats",
      "/about",
      "/tutorial",
      "/leave",
    ];
    return showNavbarPaths.includes(pathname);
  }

  return (
    <>
      {shouldShowNavbar(location.pathname) && <Navbar />}

      {/* Cubierta de transición */}
      <AnimatePresence mode="wait">
        <motion.div
          key={"transition-" + location.pathname}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="transition-cover"
        />

        <Routes location={location} key={location.pathname}>
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
          <Route
            path="/leave"
            element={
              <ProtectedRoute>
                <Leave />
              </ProtectedRoute>
            }
          />
          <Route path="/tutorial" element={<Tutorial />} />

          {/* Ruta comodín */}
          <Route path="/*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function RedirectToProperPage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  console.log("isAuthenticated" + localStorage.getItem("user"));
  return isAuthenticated ? (
    <Navigate to="/main" replace />
  ) : (
    <Navigate to="/home" replace />
  );
}

export default App;
