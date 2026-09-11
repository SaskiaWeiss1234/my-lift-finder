"use client"
import { signIn,  } from "next-auth/react";
import { useState } from "react";


export default function AuthForm({switchMode, setIsOpen, mode }) {
    const [email, setEmail] = useState("");
    const [name,setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setIsLoading] = useState(false);
     
    async function handleSubmit(e) {
            e.preventDefault();
            setError("")
            const result =await signIn("credentials", { email, password, redirect: false});
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
            switchMode("Login");
            setSuccess("Account created! Please sign in.");
        }
    }
   return (
    <>
               {mode === "Login" && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <h1 className="">Login</h1>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="Email" className="border p-2 rounded text-gray-500" />
                    <div className="relative">
                     <input value={password}onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"} placeholder="Password" className="border text-gray-500 p-2 rounded w-full pr-14" />
                    <button
                        type="button"
                 onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                     {showPassword ? "Hide" : "Show"}
                     </button>
                     </div>
                     {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="bg-black text-white p-2 rounded">Sign In </button>
                    {success && <p className="text-green-600 text-sm">{success}</p>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    <p className="text-sm text-center text-gray-500">
                         No account?{" "}
                        <button type="button" onClick={() => switchMode("Register")}
                        className="underline text-black">
                            Register 
                        </button>
                    </p>
                    </form>)}

                     {mode === "Register" && (
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                     <input required value={name} onChange={(e) => setName(e.target.value)}
                    type="name" placeholder="Name" className="border p-2 rounded text-gray-500" />
                    <input required value={email} onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="Email" className="border p-2 rounded text-gray-500" />
                    <div className="relative">
                     <input required value={password}onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"} placeholder="Password" className="border text-gray-500 p-2 rounded w-full pr-14" />
                    <button
                        type="button"
                 onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                     {showPassword ? "Hide" : "Show"}
                     </button>
                     </div>
                     {success && <p className="text-green-600 text-sm">{success}</p>}
                     {error && <p className="text-red-500 text-sm">{error}</p>}
                     <p className="text-sm text-center text-gray-500">
                         Already have an account?{" "}
                        <button type="button" onClick={() => switchMode("Login")} className="underline text-black">
                            Sign In
                        </button>
                        </p>
                     <button type="submit" className="bg-black text-white p-2 rounded"> Register </button>
                    </form>
                    )}
                    </>
                     );
                    }
        