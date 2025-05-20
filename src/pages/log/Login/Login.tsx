import React from "react";
import "../Login.css";
import BitInput from "../../../components/InputText/BitInput/BitInput";
import BitInputPassword from "../../../components/InputText/BitInputPassword/BitInputPassword";
import useFormHandler from "../../../hooks/useFormHandler";
import BitButton from "../../../components/BitButton/BitButton";
import { useAuth } from "../../../hooks/AuthProvider";
import { Navigate } from "react-router-dom";
import { User } from "../../../interfaces/User";

function Login() {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    // Si ya está autenticado, redirige al main
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

      // Crear usuario desde la respuesta API
      const user = User.fromApiResponse(data.user);

      // Guardar en contexto y localStorage
      login(user);

      // No es necesario navegar aquí, RedirectToProperPage manejará la redirección
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
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

        <BitButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Loading..." : "ACCEPT"}
        </BitButton>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
