import { syncElevators } from "../../../../db/syncElevators.js";

export async function POST() {
  const result = await syncElevators();
  return Response.json(result);
}


