export function getColorByState(state) {
    if (state === "ACTIVE") {
        return "green";
    }
    if (state === "INACTIVE") {
        return "red";
    } 
    return "gray"; // Default color for unknown states
}

export function createIcon(state) {
    const color = getColorByState(state);
    return L.divIcon({
        className: "",
        html:`<svg width="22px" height="22px" viewBox="0 0 0.44 0.44" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M0.055 0.165v0.008c0 0.039 0.013 0.077 0.038 0.108L0.22 0.44l0.127 -0.159A0.173 0.173 0 0 0 0.385 0.173V0.165A0.165 0.165 0 0 0 0.055 0.165m0.165 0.055a0.055 0.055 0 1 0 0 -0.11 0.055 0.055 0 0 0 0 0.11" fill=${color} fill-rule="evenodd"/></svg>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    });
}