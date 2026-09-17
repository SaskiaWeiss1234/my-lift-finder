"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default  function VerifyEmailForm( { token }) {
    const [ message, setMessage] = useState("Verifying...");
    const router = useRouter();

    useEffect(() => {
        async function verify() {  
        const result = await fetch("/api/verify-email", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ token }),
        });
        if (result.ok) {
            const { email } = await result.json();
            setMessage("Email verified successfully! You can now sign in.");
            router.push(`/?openLogin=true&email=${encodeURIComponent(email)}`);
        } else {
            setMessage("Verification failed. The link may be invalid or expired."); 
        }
    }
    verify();
}, [token]);

return (
<>
<p>{message}</p>
<button onClick={() => router.push("/?openLogin=true")}>
    Back to sign In
</button>
</>
);
}