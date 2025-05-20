import React from "react";
import "@pages/log/Login.css";
import BitTextField from "../../../components/InputText/BitInput/BitInput.tsx";
import BitInputPassword from "../../../components/InputText/BitInputPassword/BitInputPassword.tsx";
import useFormHandler from "../../../hooks/useFormHandler";
import BitButton from "../../../components/BitButton/BitButton.tsx";
import { useAuth } from "../../../hooks/AuthProvider.tsx";
import { Navigate } from "react-router-dom";

function SignUp() {
  const { isAuthenticated, login } = useAuth();

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
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.gamedev.study/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          fullname: values.fullName,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      const data = await response.json();

      // Usar login del contexto con el usuario recibido
      login(data.user);

      // No navegar manualmente, RedirectToProperPage lo hará
    } catch (error: any) {
      setErrorMessage(
        error.message || "Failed to register user. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <h2 className="login-title">Sign Up</h2>

        <BitTextField
          placeholder="Enter your full name"
          value={values.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        <BitTextField
          placeholder="Enter your email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <BitTextField
          placeholder="Enter your username"
          value={values.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <BitInputPassword
          placeholder="Enter your password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <BitButton onClick={handleRegister} disabled={isLoading}>
          {isLoading ? "Loading..." : "SIGN UP"}
        </BitButton>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUp;
