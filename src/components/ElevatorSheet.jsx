"use client" 

import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";


const fetcher = (url) => fetch(url).then((res) => res.json());

 export default function ElevatorSheet({elevator, onClose}) {
    const { data: session } = useSession();
    const [isReporting, setIsReporting] = useState(false);
    const [reportState, setReportState] =  useState("ACTIVE");
    const [reportComment, setReportComment] = useState("");
    const [error,setError] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    

const { data: reports = [], mutate } = useSWR(`/api/reports?elevatorID=${elevator.elevatorID}`, fetcher)

     async function handleDelete(reportId) {
    const response = await fetch(`/api/reports/${reportId}`, {
        method: "DELETE",
    });
     console.log("Delete response status:", response.status); 
    if (response.ok) {
        if (isEditing === reportId) {
            setIsEditing(null);
        }
        mutate();
    }
}
    async  function handleReport(e) {
        e.preventDefault();
        setError("");
        if (isEditing) {
    const response = await fetch(`/api/reports/${isEditing}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: reportState, comment: reportComment }),
    });
     if (response.ok) {
      setIsEditing(null);
      setIsReporting(false);
      mutate();
    }
} else 
          {  const result = await fetch("/api/reports",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({elevatorID: elevator.elevatorID, state: reportState, comment: reportComment}),
            })
            console.log("Status:", result.status);
           if (result.status === 400) {
            setError("Please select a state")
            } else if (!result.ok) {
                setError("Something went wrong")
            } else {
                setIsReporting(false);
                mutate();
            }
        }
    }
return (
                    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[2000] bg-surface rounded-t-2xl shadow-lg p-4 max-h-[70vh] overflow-y-auto w-full max-w-[min(90vw, 900px)]">
                        <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-foreground">{elevator.stationName}</h3>
                        <button onClick={onClose} className="text-foreground text-xl leading-none" aria-label="Close">&times;</button>
                        </div>
                        <p className="text-foreground text-sm">{elevator.description}</p>
                        <p className="text-foreground" aria-label="Official Status of selected Elevator" >Official status: {elevator.state}</p>
                        
                        {reports.length > 0 && (
                        <div className="mt-2 border-t border-border-subtle pt-2">
                            <p className="text-xs font-semibold text-muted mb-1">Community Reports:</p>
                            {reports.map((report) => (
                            <div key={report._id} className="text-xs text-foreground mb-2">
                                <span>{report.state === "ACTIVE" ? "✅ Working" : "❌ Broken"}</span>
                                {report.comment && <p className="text-muted">{report.comment}</p>}
                                {session?.user?.id === report.userId && isEditing !== report._id && (
                                    <button
                                    type="button"
                                    onClick={() => handleDelete(report._id)}
                                    aria-label="Delete your report"
                                    className="text-alert text-xs underline mt-1 mr-2">
                                        Delete
                                    </button>
                                )}

                        {session?.user?.id === report.userId && isEditing !== report._id && (
                            <button
                                type="button"
                                onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(report._id);
                                setReportState(report.state);
                                setReportComment(report.comment || "");
                                setIsReporting(true);
                                }}
                                aria-label="Edit your report"
                                className="text-primary text-xs underline mt-1 "
                            >Edit</button>
                            )}
                            </div>
                            ))}
                        </div>
)}
                        { session && !isReporting && (
                            <button className="bg-accent rounded px-3 text-white  py-2 mt-2 hover:opacity-90 transition-opacity" onClick={(e) => {  
                                e.stopPropagation();
                                setIsReporting(true)}}>Report Status</button>
                        )}
                         {isReporting && (
             <form onSubmit={handleReport} className="flex flex-col gap-2">
                <select value={reportState} onChange={(e) => setReportState(e.target.value)}
                aria-label="Elevator status"
                className="border border-border-subtle p-2 rounded bg-surface text-foreground"
                >
                    <option value="ACTIVE">Working</option>
                    <option value="INACTIVE">Broken</option>
                </select>
                <textarea
                value={reportComment}
                onChange={(e) => setReportComment(e.target.value)}
                placeholder="Optional comment (max 150 characters)"
                aria-label="Comment (optional, max 150 characters)"
                maxLength={150}
                className="border border-border-subtle p-2 rounded text-sm resize-none bg-surface text-foreground placeholder:text-muted"
                rows={3}
                    />
            <div className="flex gap-2">
                {error && <p className="text-alert text-sm">{error}</p>}
                <button type="submit" className="bg-primary text-white p-2 rounded text-sm hover:opacity-90 transition-opacity">{isEditing ? "Save Changes" : "Submit Report"}</button>
                <button type="button" onClick={() => setIsReporting(false)} className="border border-border-subtle p-2 rounded text-sm text-foreground bg-surface-elevated">Cancel</button>
            </div>
            </form>
             )}
            </div>
            
        );
    }

