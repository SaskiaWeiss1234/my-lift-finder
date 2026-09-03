import { syncElevators } from "@/app/api/sync/route.js";

export async function GET() {
  const result = await syncElevators();
  return Response.json(result);
}


