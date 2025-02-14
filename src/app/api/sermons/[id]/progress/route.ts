import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Sermon from "@/models/sermon";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { progress } = await request.json();
    await connectToDatabase();

    // Update sermon stats
    const sermon = await Sermon.findByIdAndUpdate(
      params.id,
      {
        $inc: {
          totalPlayTime: 1,
          ...(progress >= 90 ? { completions: 1 } : {}), // Count as completed if progress >= 90%
        },
      },
      { new: true }
    );

    if (!sermon) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json(sermon);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update progress" },
      { status: 500 }
    );
  }
}
