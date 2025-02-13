import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { login, signUp } from "../apis/auth";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const navigate=useNavigate()
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLogin, setIsLogin] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Validation for Sign-Up
            if (!isLogin) {
                if (!input.email || !input.password || !input.confirmPassword) {
                    alert("Please fill all fields.");
                    return;
                }
                if (input.password !== input.confirmPassword) {
                    alert("Passwords do not match.");
                    return;
                }
            }

            // Validation for Login
            if (isLogin) {
                if (!input.email || !input.password) {
                    alert("Please fill all fields.");
                    return;
                }
            }

            // Call the API
            const response = isLogin
                ? await login(input.email, input.password)
                : await signUp(input.email, input.password);
            console.log(response);
            localStorage.setItem('expense-user',JSON.stringify(response))
            alert(isLogin ? "Login successful!" : "Sign-up successful!");
            navigate('/welcome')
        } catch (error) {
            alert(error.response?.data?.error?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    padding: "1rem",
                    border: "1px solid #c0c0c0",
                    backgroundColor: "white",
                    width: "20rem",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    boxSizing: 'border-box',
                }}
            >
                <p style={{ margin: 30, fontSize: 24, fontWeight: "normal" }}>
                    {isLogin ? 'Login' : 'Sign up'}
                </p>
                <form onSubmit={handleSubmit} style={{ margin: 0, padding: 0, width: '100%' }}>
                    <CustomInput
                        type={"email"}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        required={true}
                        placeholder={"Email"}
                        title="Email"
                    />
                    <CustomInput
                        type={"password"}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        required={true}
                        placeholder={"Password"}
                        title="Password"
                    />
                    {!isLogin && <CustomInput
            type={"text"}
            onChange={handleChange}
            required={true}
            id='confirmPassword'
            name='confirmPassword'
            placeholder={"Confirm Password"}
            title="Password"
          />}
                    <CustomButton
                        type={'submit'}
                        title={isLogin ? 'Login' : 'Sign up'}
                        disabled={
                            isLogin
                                ? !input.email || !input.password
                                : !input.email || !input.password || !input.confirmPassword || input.password !== input.confirmPassword
                        }
                        style={{marginTop:20}}
                    />
                </form>
            </div>
            <button
                onClick={() => setIsLogin(prev => !prev)}
                style={{
                    border: '1px solid black',
                    padding: "1rem",
                    backgroundColor: "#abcdff",
                    width: "20rem",
                    marginTop: 20,
                    borderRadius: 12,
                    fontSize: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    cursor:'pointer'
                }}
            >
                {!isLogin ? 'Have an Account? Login' : `Don't have an Account? Sign Up`}
            </button>
        </div>
    );
}

export default LoginScreen;