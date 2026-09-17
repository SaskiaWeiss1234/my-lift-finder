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
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push(`/?openLogin=true&email=${encodeURIComponent(email)}`);
        } else {
            setMessage("Verification failed. The link may be invalid or expired."); 
        }
    }
    verify();
}, [token]);

return (
<div className="border border-border-subtle bg-surface rounded p-4 max-w-sm mx-auto mt-8 text-center">
<p className="text-foreground">{message}</p>
<button onClick={() => router.push("/?openLogin=true")}
    className="mt-3 bg-primary text-white p-2 rounded hover:opacity-90 transition-opacity">
    Back to sign In
</button>
</div>
);
}