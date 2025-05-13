import React from "react";
import "@pages/log/Login.css";
import BitInput from "../../../components/BitInput/BitInput.tsx";
import BitInputPassword from "../../../components/BitInputPassword/BitInputPassword.tsx";
import useFormHandler from "../../../hooks/useFormHandler";
import BitButton from "../../../components/BitButton/BitButton.tsx";
import { useAuth } from "../../../hooks/AuthProvider.tsx";

function Login() {
  const { login } = useAuth();
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
      const response = await fetch("http://10.5.160.163:8000/auth/login", {
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

      // Guarda info del usuario si querés
      localStorage.setItem("user", JSON.stringify(data.user));

      login(); // marcar como autenticado
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
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
        />

        <BitButton onClick={handleLogin}>
          {isLoading ? "Loading..." : "LOG IN"}
        </BitButton>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
