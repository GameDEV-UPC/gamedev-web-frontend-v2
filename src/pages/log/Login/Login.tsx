import React from "react";
import "@pages/log/Login.css"
import BitTextField from "@components/BitInput/BitInput.tsx";
import BitInputPassword from "@components/BitInputPassword/BitInputPassword.tsx";
import useFormHandler from "@hooks/useFormHandler";
import BitButton from "@components/BitButton/BitButton.tsx";
import EffectText from "@components/EffectText/EffectText.tsx";

function Login() {
    const { values, errorMessage, isLoading, setErrorMessage, setIsLoading, handleChange } = useFormHandler({
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
            const response = await fetch("http://0.0.0.0:8000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Registration failed");
            }

            console.log("Usuario logeado exitosamente!");
        } catch (error) {
            setErrorMessage(error.message || "Failed to register user. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-title">
                    <EffectText
                        pixelMode
                        fontSize="3rem"
                        borderOffset={3.0}

                    >

                        LOG IN

                    </EffectText>
                </div>

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



                <BitButton onClick={handleRegister}  >
                    {isLoading ? "Loading..." : "LOG IN"}
                </BitButton>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

            </div>
        </div>
    );
}

export default Login;
