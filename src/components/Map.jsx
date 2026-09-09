"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";



export function getColorByState(state) {
    if (state === "ACTIVE") {
        return "green";
    }
    if (state === "INACTIVE") {
        return "red";
    } 
    return "gray"; // Default color for unknown states
}
function createIcon(state) {
    const color = getColorByState(state);
    return L.divIcon({
        className: "",
    html:`<svg width="22px" height="22px" viewBox="0 0 0.44 0.44" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M0.055 0.165v0.008c0 0.039 0.013 0.077 0.038 0.108L0.22 0.44l0.127 -0.159A0.173 0.173 0 0 0 0.385 0.173V0.165A0.165 0.165 0 0 0 0.055 0.165m0.165 0.055a0.055 0.055 0 1 0 0 -0.11 0.055 0.055 0 0 0 0 0.11" fill=${color} fill-rule="evenodd"/></svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
}
        
 function ElevatorPopup({elevator}) {
    const { data: session } = useSession();
    const [isReporting, setIsReporting] = useState(false);
    const [reportState, setReportState] =  useState("ACTIVE");
    const [reportComment, setReportComment] = useState("");
    const [error,setError] = useState("");
    const [reports, setReports] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editState, setEditState] = useState("");
    const [editComment, setEditComment] = useState("");

    useEffect(() => {
        if (!isReporting) {
            async function fetchReports() {  
          const response = await fetch(`/api/reports?elevatorID=${elevator.elevatorID}`);
          const data = await response.json();
          setReports(data);
            }
         fetchReports();
        }
    }, [isReporting, elevator.elevatorID]);



     async function handleDelete(reportId) {
    const response = await fetch(`/api/reports/${reportId}`, {
        method: "DELETE",
    });
     console.log("Delete response status:", response.status); 
    if (response.ok) {
        setReports(reports.filter(r => r._id !== reportId));
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
      setReports(reports.map(r =>
        r._id === isEditing
          ? { ...r, state: reportState, comment: reportComment }
          : r
      ));
      setIsEditing(null);
      setIsReporting(false);
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
                                {session?.user?.id === report.userId && (
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




export default function Map({ elevators }) {
   const { data: session } = useSession();
    return (
        <MapContainer 
        center={[50.942519, 6.958543]}
        zoom={13}
        className="h-full w-full rounded-xl"
        maxBounds={[[50.83, 6.70], [51.02, 7.24],   
  ]}     
        >
        <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
             {elevators.map(elevator => (
                <Marker
                key={elevator.elevatorID}
                position={[elevator.latitude, elevator.longitude]}
                icon={createIcon(elevator.state)}
                >
             <ElevatorPopup elevator={elevator} />
            </Marker>
                ))}
        </MapContainer>
    );
}