import React from "react";
import "../Login.css";
import BitInput from "../../../components/InputText/BitInput/BitInput";
import BitInputPassword from "../../../components/InputText/BitInputPassword/BitInputPassword";
import useFormHandler from "../../../hooks/useFormHandler";
import BitButton from "../../../components/BitButton/BitButton";
import { useAuth } from "../../../hooks/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../../../interfaces/User";
import transition from "../../../hooks/transition";

function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  const {
    values,
    errorMessage,
    isLoading,
    setErrorMessage,
    setIsLoading,
    handleChange,
  } = useFormHandler({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.gamedev.study/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();

      // 🔥 Crear User desde respuesta API
      const user = User.fromApiResponse(data.user);

      // Guardar en context y localStorage
      login(user);

      // Redirigir al main
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
      navigate("/main");
    }
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <h2 className="login-title">LOG IN</h2>

        <BitInput
          placeholder="Enter your email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <BitInputPassword
          placeholder="Enter your password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <BitButton onClick={handleLogin}>
          {isLoading ? "Loading..." : "ACCEPT"}
        </BitButton>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default transition(Login);
