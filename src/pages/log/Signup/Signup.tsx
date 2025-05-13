import React from "react";
import "@pages/log/Login.css";
import BitTextField from "../../../components/BitInput/BitInput.tsx";
import BitInputPassword from "../../../components/BitInputPassword/BitInputPassword.tsx";
import useFormHandler from "../../../hooks/useFormHandler";
import BitButton from "../../../components/BitButton/BitButton.tsx";

function SignUp() {
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
    console.log("Registrando usuario...");
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://0.0.0.0:8000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      console.log("Usuario registrado exitosamente!");
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to register user. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-title">
          <h2>Sign Up</h2>
        </div>
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
        <BitInputPassword placeholder="Enter your password" />

        <BitButton onClick={handleRegister}>
          {isLoading ? "Loading..." : "SIGN UP"}
        </BitButton>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUp;
