import { db } from "@/lib/firebase-admin";

export async function GET() {
  try {
    // Get all unique series from sermons collection
    const sermonSnapshot = await db.collection("sermons").get();
    const series = new Set<string>();

    sermonSnapshot.docs.forEach((doc) => {
      const sermonData = doc.data();
      if (sermonData.series) {
        series.add(sermonData.series);
      }
    });

    return Response.json(Array.from(series));
  } catch (error) {
    console.error("Error fetching series:", error);
    return Response.json({ error: "Failed to fetch series" }, { status: 500 });
  }
}
