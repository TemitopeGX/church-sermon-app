import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Sermon from "@/models/sermon";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const sermon = await Sermon.findById(params.id);

    if (!sermon) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json(sermon);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch sermon" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const sermon = await Sermon.findByIdAndDelete(params.id);

    if (!sermon) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Sermon deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete sermon" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const sermon = await Sermon.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!sermon) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json(sermon);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update sermon" },
      { status: 500 }
    );
  }
}
