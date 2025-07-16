import React from "react";
import "../Login.css";
import BitInput from "../../../components/InputText/BitInput/BitInput";
import BitInputPassword from "../../../components/InputText/BitInputPassword/BitInputPassword";
import useFormHandler from "../../../hooks/useFormHandler";
import BitButton from "../../../components/BitButton/BitButton";
import { useAuth } from "../../../hooks/AuthProvider";
import { Navigate } from "react-router-dom";
import { Github, CircleUserRound } from "lucide-react";

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
      login(data.user);
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

        <BitInput
          placeholder="Enter your full name"
          value={values.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        <BitInput
          placeholder="Enter your email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <BitInput
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
