import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Sermon from "@/models/sermon";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectToDatabase();
    const sermons = await Sermon.find().sort({ createdAt: -1 });
    return NextResponse.json(sermons);
  } catch (error: any) {
    console.error("Error fetching sermons:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch sermons" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Upload audio file to Cloudinary
    const audioFile = formData.get("audioFile") as File;
    const audioBuffer = await audioFile.arrayBuffer();
    const audioUpload = (await uploadToCloudinary(
      Buffer.from(audioBuffer),
      "sermons/audio"
    )) as any;

    // Upload thumbnail if provided
    let thumbnailUrl = undefined;
    const thumbnailFile = formData.get("thumbnail") as File;
    if (thumbnailFile) {
      const thumbnailBuffer = await thumbnailFile.arrayBuffer();
      const thumbnailUpload = (await uploadToCloudinary(
        Buffer.from(thumbnailBuffer),
        "sermons/thumbnails"
      )) as any;
      thumbnailUrl = thumbnailUpload.secure_url;
    }

    // Connect to database
    await connectToDatabase();

    // Create sermon document
    const sermon = await Sermon.create({
      title: formData.get("title"),
      description: formData.get("description"),
      preacher: formData.get("preacher"),
      date: formData.get("date"),
      series: formData.get("series"),
      audioUrl: audioUpload.secure_url,
      thumbnailUrl,
      duration: audioUpload.duration || "0:00",
      views: 0,
    });

    return NextResponse.json(sermon);
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
