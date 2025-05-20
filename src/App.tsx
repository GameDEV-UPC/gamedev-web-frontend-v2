import "./App.css";
import Home from "./pages/Home/Home.tsx";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./hooks/AuthProvider.tsx";
import { ProtectedRoute } from "./hooks/ProtectedRoute.tsx";
import Navbar from "./components/NavBar/NavBar.tsx";
import MyStats from "./pages/MyStats/MyStats.tsx";
import About from "./pages/About/About.tsx";
import Login from "./pages/log/Login/Login.tsx";
import SignUp from "./pages/log/Signup/Signup.tsx";
import Main from "./pages/Main/Main.tsx";
import Tutorial from "./pages/Tutorial/Tutorial.tsx";
import Leave from "./pages/Tutorial/Leave.tsx";
import RedirectToProperPage from "./hooks/Redirect.tsx";
import { PageTransitionProvider } from "./hooks/transition.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <PageTransitionProvider>
          <div className="app-container">
            <MainContent />
          </div>
        </PageTransitionProvider>
      </Router>
    </AuthProvider>
  );
}

function MainContent() {
  const location = useLocation();

  const showNavbarPaths = [
    "/main",
    "/mystats",
    "/about",
    "/tutorial",
    "/leave",
  ];

  return (
    <>
      {showNavbarPaths.includes(location.pathname) && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Ruta raíz redirige según estado auth */}
          <Route path="/" element={<RedirectToProperPage />} />

          {/* Rutas públicas */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tutorial" element={<Tutorial />} />

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

          {/* Cualquier ruta no definida redirige según estado */}
          <Route path="/*" element={<RedirectToProperPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
