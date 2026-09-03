import { syncElevators } from "../../../../db/syncElevators.js";

export async function GET() {
  const result = await syncElevators();
  return Response.json(result);
}


