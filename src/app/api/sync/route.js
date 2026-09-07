import { syncElevators } from "@/db/syncElevators";

export async function POST() {
  const result = await syncElevators();
  return Response.json(result);
}


