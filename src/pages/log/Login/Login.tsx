import React from "react";
import "../Login.css";
import BitInput from "../../../components/InputText/BitInput/BitInput";
import BitInputPassword from "../../../components/InputText/BitInputPassword/BitInputPassword";
import useFormHandler from "../../../hooks/useFormHandler";
import BitButton from "../../../components/BitButton/BitButton";
import { useAuth } from "../../../hooks/AuthProvider";
import { Navigate } from "react-router-dom";
import { User } from "../../../interfaces/User";
import { Github, CircleUserRound } from "lucide-react";

function Login() {
  const { isAuthenticated, login, loading } = useAuth(); // ← ahora incluye `loading`

  if (loading) {
    return <p>Loading session...</p>;
  }

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useFormHandler({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    if (!values.email || !values.password) {
      setErrorMessage("Email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("username", values.email);
      formData.append("password", values.password);

      const response = await fetch("https://api.gamedev.study/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      login(data.access_token);
      // Aquí puedes parsear o guardar token según tu lógica
      // Por ejemplo, guardar token en localStorage/sessionStorage
      localStorage.setItem("access_token", data.access_token);

      // O construir user desde backend si quieres devolver user info también
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
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
          <BitButton type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "ACCEPT"}
          </BitButton>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
