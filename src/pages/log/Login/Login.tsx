import React from "react";
import "@pages/log/Login.css";
import BitInput from "../../../components/InputText/BitInput/BitInput.tsx";
import BitInputPassword from "../../../components/InputText/BitInputPassword/BitInputPassword.tsx";
import useFormHandler from "../../../hooks/useFormHandler";
import BitButton from "../../../components/BitButton/BitButton.tsx";
import { useAuth } from "../../../hooks/AuthProvider.tsx";
import { Navigate, useNavigate } from "react-router-dom";
import BoxSection from "../../../components/BoxSection/BoxSection.tsx";

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
    console.log("Iniciando sesión...");
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
      console.log("Usuario logeado:", data);

      localStorage.setItem("user", JSON.stringify(data.user));
      login(data.user);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
      navigate("/main");
    }
  };

  return (
    <div className="login-page">
      <BoxSection>
        <div className="login-title">
          <h2>LOG IN</h2>
        </div>

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
          {isLoading ? "Loading..." : "LOG IN"}
        </BitButton>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </BoxSection>
    </div>
  );
}

export default Login;
