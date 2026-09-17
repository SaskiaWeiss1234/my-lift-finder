"use client"

import { useState } from "react";

export default function ResetPasswordForm({ token }) {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


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
            setSuccess("New Pasword succesfully submitted")
        } else {
            setError("Something went wrong")
        }
    }
return (
    <>
    <div className="border bg-gray-100">
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            placeholder="New password" 
                            className="border p-2 rounded text-gray-500" 
                            />
                            {success && <p className="text-green-600 text-sm">{success}</p>}
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" className="bg-black text-white p-2 rounded">Create new Password</button>
                        </form>
                        </div>
    </>
)
}
