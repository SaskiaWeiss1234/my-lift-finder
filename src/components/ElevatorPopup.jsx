"use client" 

import { Popup } from "react-leaflet";
import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";


const fetcher = (url) => fetch(url).then((res) => res.json());

 export default function ElevatorPopup({elevator}) {
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
    <Popup>
                    <div>
                        <h3>{elevator.description}</h3>
                        <p>Official status: {elevator.state}</p>
                        {reports.length > 0 && (
                        <div className="mt-2 border-t pt-2">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Community Reports:</p>
                            {reports.map((report) => (
                            <div key={report._id} className="text-xs text-gray-700 mb-1">
                                <span>{report.state === "ACTIVE" ? "✅ Working" : "❌ Broken"}</span>
                                {report.comment && <p className="text-gray-500">{report.comment}</p>}
                                {session?.user?.id === report.userId && isEditing !== report._id && (
                                    <button
                                    type="button"
                                    onClick={() => handleDelete(report._id)}
                                    className="text-red-500 text-xs underline mt-1"
                                    >Delete
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
                                className="text-blue-500 text-xs underline mt-1 ml-2"
                            >Edit</button>
                            )}
                            </div>
                            ))}
                        </div>
)}
                        { session && !isReporting && (
                            <button className="bg-yellow-500 rounded p-1.5 m-1.5" onClick={(e) => {  
                                e.stopPropagation();
                                setIsReporting(true)}}>Report Status</button>
                        )}
                         {isReporting && (
             <form onSubmit={handleReport} className="flex flex-col gap-2">
                <select value={reportState} onChange={(e) => setReportState(e.target.value)}
                className="border p-1 rounded"
                >
                    <option value="ACTIVE">Working</option>
                    <option value="INACTIVE">Broken</option>
                </select>
                <textarea
                value={reportComment}
                onChange={(e) => setReportComment(e.target.value)}
                placeholder="Optional comment (max 150 characters)"
                maxLength={150}
                className="border p-1 rounded text-sm resize-none"
                rows={3}
                    />
            <div className="flex gap-2">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="bg-black text-white p-1 rounded text-sm">{isEditing ? "Save Changes" : "Submit Report"}</button>
                <button type="button" onClick={() => setIsReporting(false)} className="border p-1 rounded text-sm">Cancel</button>
            </div>
            </form>
             )}
            </div>
            </Popup>
        );
    }

