"use client"

import { useState, useEffect } from "react";

const STORAGE_KEY = "myliftfinder:colorblind-mode";

export default function ColorblindToggle() {
    const [enabled, setEnabled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setEnabled(document.documentElement.getAttribute("data-colorblind") === "true");
        setMounted(true);
    }, []);

    function toggle() {
        const next = !enabled;
        setEnabled(next);
        document.documentElement.setAttribute("data-colorblind", String(next));
        try {
            localStorage.setItem(STORAGE_KEY, String(next));
        } catch (e) {}
    }

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={toggle}
            aria-label="Toggle colorblind-safe mode"
            aria-pressed={enabled}
            className="flex items-center gap-2"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    fill={enabled ? "var(--marker-active)" : "white"}
                />
            </svg>
        </button>
    );
}
