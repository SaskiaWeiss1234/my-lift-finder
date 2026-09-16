"use client"

import { useState, useEffect } from "react";

export default  function VerifyEmailForm( { token }) {
    const [ message, setMessage] = useState("Verifying...");


    useEffect(() => {
        async function verify() {  
        const result = await fetch("/api/verify-email", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ token }),
        });
        if (result.ok) {
            setMessage("Email verified successfully! You can now sign in.");
        } else {
            setMessage("Verification failed. The link may be invalid or expired."); 
        }
    }
    verify();
}, [token]);

return <p>{message}</p>;
}