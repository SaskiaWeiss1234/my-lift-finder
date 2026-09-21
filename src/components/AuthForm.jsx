"use client"
import { signIn,  } from "next-auth/react";
import { useState } from "react";


export default function AuthForm({switchMode, setIsOpen, mode, initialEmail }) {
    const [email, setEmail] = useState(initialEmail || "");
    const [name,setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setIsLoading] = useState(false);

    function handleSwitchMode(newMode) {
        setError("");
        setSuccess("");
        switchMode(newMode);
    }

    async function handleLogin(e) {
            e.preventDefault();
            setError("")
            const result = await signIn("credentials", { email, password, redirect: false});
            if (result?.error) {
                setError("wrong email or password");
            } else 
                setIsOpen(false);
                
        }
        async function handleRegister(e) {
        e.preventDefault();
        setError("")
        setIsLoading(true);
        const result = await fetch("/api/register",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ name, email, password }),
        })
        console.log("Status:", result.status);
        if (result.status === 409) {
            setError("Email already registered");
        }else if (result.status === 400) {
            setError("Please fill in all fields!")
        } else if (!result.ok) {
            setError("Something went wrong");
        } else {
            handleSwitchMode("Login");
            setSuccess("Account created! Please verify your email trough the link we sent you. ");
        }
    }
    async function handleForgotPassword(e) {
        e.preventDefault();
        setError("");
        setSuccess("");
        const result = await fetch("/api/password-reset/request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (result.ok) {
            setSuccess("If an account exists, a reset link has been sent.")
        } else {
            setError("Something went wrong");
        }
    }
   return (
    <>
               {mode === "Login" && (
                <form onSubmit={handleLogin} className="flex flex-col gap-2">
                    <h1 className="text-lg font-bold text-foreground">Login</h1>
                    <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="Email" 
                    className="border border-border-subtle p-2 rounded text-foreground bg-surface w-full pr-14 placeholder:text-muted"
                    aria-label="Email" />
                    <div className="relative">
                     <input
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="border border-border-subtle p-2 rounded text-foreground bg-surface w-full pr-14 placeholder:text-muted"
                    aria-label="Password"
                    />
                    <button
                        type="button"
                 onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-2 top-1/2 -translate-y-1/2 text-muted text-sm"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                     {showPassword ? "Hide" : "Show"}
                     </button>
                     </div>
                    <button type="submit" className="bg-primary text-white p-2 rounded hover:opacity-90 transition-opacity">Sign In </button>
                    {success && <p className="text-success text-sm">{success}</p>}
                        {error && <p className="text-alert text-sm">{error}</p>}
                    <p className="text-sm text-center text-muted">
                         No account?{" "}
                        <button type="button" onClick={() => handleSwitchMode("Register")}
                        className="underline text-primary">
                            Register 
                        </button>
                    </p>
                    <p className="text-sm text-center text-muted">
                         Forgot Password?{" "}
                        <button type="button" onClick={() => handleSwitchMode("Forgot Password")}
                        className="underline text-primary">
                            Reset Password 
                        </button>
                    </p>
                    </form>)}

                     {mode === "Register" && (
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <h1 className="text-lg font-bold text-foreground">Register</h1>
                     <input 
                     required 
                     value={name} 
                     onChange={(e) => setName(e.target.value)}
                    type="name" 
                    placeholder="Name" 
                    className="border border-border-subtle p-2 rounded text-foreground bg-surface w-full pr-14 placeholder:text-muted"
                    aria-label="Name" />
                    <input 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="Email" 
                    className="border border-border-subtle p-2 rounded text-foreground bg-surface w-full pr-14 placeholder:text-muted"
                    aria-label="Email" />
                    <div className="relative">
                     <input 
                     required 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                     placeholder="Password" 
                     className="border border-border-subtle p-2 rounded text-foreground bg-surface w-full pr-14 placeholder:text-muted"
                     aria-label="Password" />
                    <button
                        type="button"
                 onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-2 top-1/2 -translate-y-1/2 text-muted text-sm"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                     {showPassword ? "Hide" : "Show"}
                     </button>
                     </div>
                     {success && <p className="text-success text-sm">{success}</p>}
                     {error && <p className="text-alert text-sm">{error}</p>}
                     <p className="text-sm text-center text-muted">
                         Already have an account?{" "}
                        <button type="button" onClick={() => handleSwitchMode("Login")} className="underline text-primary">
                            Sign In
                        </button>
                        </p>
                     <button type="submit" className="bg-primary text-white p-2 rounded hover:opacity-90 transition-opacity"> Register </button>
                    </form>
                    )}
                    {mode === "Forgot Password" && (
                        <form className="flex flex-col gap-2" onSubmit={handleForgotPassword}>
                            <h1 className="text-lg font-bold text-foreground">Reset Password</h1>
                            <input 
                            required
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            className="border border-border-subtle p-2 rounded text-foreground bg-surface w-full pr-14 placeholder:text-muted" 
                            aria-label="Email" />
                            {success && <p className="text-success text-sm">{success}</p>}
                     {error && <p className="text-alert text-sm">{error}</p>}
                        <button type="submit" className="bg-primary text-white p-2 rounded hover:opacity-90 transition-opacity">Send Reset Link</button>
                        </form>
                    )}
                    </>
                     );
                    }
        