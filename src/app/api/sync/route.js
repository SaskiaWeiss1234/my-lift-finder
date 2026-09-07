import { syncElevators } from "@/db/syncElevators";

export async function GET() {
  const result = await syncElevators();
  return Response.json(result);
}


