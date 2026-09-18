"use client"

import { useState } from "react";

export default function ResetPasswordForm({ token }) {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    

async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
        const result = await fetch("/api/password-reset/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword }),
        });
        if (result.ok) {
            setSuccess("New Password successfully submitted")
        } else {
            setError("Something went wrong")
        }
    }
return (
    <>
    <div className="border border-border-subtle bg-surface rounded p-4 max-w-sm mx-auto mt-8">
        <h1 className="text-lg font-bold text-foreground mb-2">Set New Password</h1>
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="relative">
                            <input 
                            type={showPassword ? "text" : "password"} 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            placeholder="New password" 
                            aria-label={showPassword ? "Hide password" : "Show password"}
                             className="border border-border-subtle p-2 rounded text-foreground bg-surface w-full pr-14 placeholder:text-muted"
                            />
                            <button
                        type="button"
                 onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-2 top-1/2 -translate-y-1/2 text-muted text-sm"
                        >
                     {showPassword ? "Hide" : "Show"}
                     </button>
                     </div>
                            {success && <p className="text-green-600 text-sm">{success}</p>}
                            {error && <p className="text-alert text-sm">{error}</p>}
                            <button type="submit" className="bg-primary text-white p-2 rounded hover:opacity-90 transition-opacity">Create new Password</button>
                        </form>
                        </div>
    </>
)
}
