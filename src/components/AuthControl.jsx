"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import AuthForm from "./AuthForm";


export default function AuthControl() {
    const { data: session, status } = useSession();
    const [ mode, setMode] = useState("Login");
    const [isOpen, setIsOpen] = useState(false);

    function switchMode(newMode) {
        setMode(newMode);
    }

    

    if (status === "loading") {
        return <p>...</p>;
    }

    if (session) {
        return (
     <div className="flex items-center gap-2">
        <span className="flex items-center gap-2">{session.user.name}</span>
        <button onClick={() => signOut()} className="flex items-center gap-2">
             <svg width="36" height="36" viewBox="0 0 1.08 1.08" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M.972.492a.07.07 0 0 1 0 .095l-.13.131a.045.045 0 0 1-.064 0 .045.045 0 0 1 0-.063.4.4 0 0 1 .076-.061L.871.583.862.574a.5.5 0 0 1-.101.011H.405a.045.045 0 1 1 0-.09h.356a.5.5 0 0 1 .101.011L.871.497.854.486A.4.4 0 0 1 .778.425a.045.045 0 0 1 0-.063.045.045 0 0 1 .064 0zM.63.72a.045.045 0 0 0-.045.045v.068a.02.02 0 0 1-.022.022H.248A.02.02 0 0 1 .226.833V.248A.02.02 0 0 1 .248.226h.315a.02.02 0 0 1 .022.022v.068a.045.045 0 1 0 .09 0V.247A.11.11 0 0 0 .563.135H.248a.11.11 0 0 0-.113.112v.585a.11.11 0 0 0 .112.113h.315A.11.11 0 0 0 .674.833V.765A.045.045 0 0 0 .629.72"
              fill="#000" />
          </svg>
            <span>Sign Out</span>
        </button>
    </div>
        );
    }
   return ( 
  <div>
<button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
 <svg width="36" height="36" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M332.64,64.58C313.18,43.57,286,32,256,32c-30.16,0-57.43,11.5-76.8,32.38-19.58,21.11-29.12,49.8-26.88,80.78C156.76,206.28,203.27,256,256,256s99.16-49.71,103.67-110.82C361.94,114.48,352.34,85.85,332.64,64.58Z" />
    <path d="M432,480H80A31,31,0,0,1,55.8,468.87c-6.5-7.77-9.12-18.38-7.18-29.11C57.06,392.94,83.4,353.61,124.8,326c36.78-24.51,83.37-38,131.2-38s94.42,13.5,131.2,38c41.4,27.6,67.74,66.93,76.18,113.75,1.94,10.73-.68,21.34-7.18,29.11A31,31,0,0,1,432,480Z" />
</svg> 
        <span>Sign In</span>
        </button>
            {isOpen && (
                <div className="fixed inset-0 z-2000 flex items-center justify-center bg-black/50"
                onClick={() => setIsOpen(false)}>
                <div className="rounded bg-white p-6 shadow-lg w-80"
                onClick={(e) => e.stopPropagation()}>
                    <AuthForm mode={mode} switchMode={switchMode} setIsOpen={setIsOpen} />
                    </div>
                    </div>
                    )}
                    </div>
   );
}
            
             
