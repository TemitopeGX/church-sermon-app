import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // Maximum allowed duration for Vercel hobby plan

// This tells Next.js to handle large file uploads
export async function POST(request: Request) {
  try {
    // Verify Cloudinary configuration
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary configuration missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const preacher = formData.get("preacher") as string;
    const series = formData.get("series") as string;
    const audio = formData.get("audio") as File;
    const thumbnail = formData.get("thumbnail") as File;

    // Validate required fields
    if (
      !title ||
      !description ||
      !preacher ||
      !series ||
      !audio ||
      !thumbnail
    ) {
      console.error("Missing required fields:", {
        title: !!title,
        description: !!description,
        preacher: !!preacher,
        series: !!series,
        audio: !!audio,
        thumbnail: !!thumbnail,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file types
    if (!audio.type.startsWith("audio/")) {
      return NextResponse.json(
        { error: "Invalid audio file type" },
        { status: 400 }
      );
    }

    if (!thumbnail.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid thumbnail file type" },
        { status: 400 }
      );
    }

    // Convert files to base64
    const audioBuffer = Buffer.from(await audio.arrayBuffer());
    const audioBase64 = `data:${audio.type};base64,${audioBuffer.toString(
      "base64"
    )}`;

    const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
    const thumbnailBase64 = `data:${
      thumbnail.type
    };base64,${thumbnailBuffer.toString("base64")}`;

    console.log("Uploading audio to Cloudinary...");
    // Upload audio to Cloudinary
    const audioUpload = await cloudinary.uploader
      .upload(audioBase64, {
        resource_type: "auto",
        folder: "sermons/audio",
        timeout: 55000, // 55 seconds timeout to ensure we stay within Vercel's 60-second limit
      })
      .catch((error) => {
        console.error("Audio upload error:", error);
        throw new Error("Failed to upload audio file");
      });

    console.log("Uploading thumbnail to Cloudinary...");
    // Upload thumbnail to Cloudinary
    const thumbnailUpload = await cloudinary.uploader
      .upload(thumbnailBase64, {
        folder: "sermons/thumbnails",
      })
      .catch((error) => {
        console.error("Thumbnail upload error:", error);
        throw new Error("Failed to upload thumbnail");
      });

    console.log("Saving to Firestore...");
    // Save to Firestore
    const sermonDoc = await db
      .collection("sermons")
      .add({
        title,
        description,
        preacher,
        series,
        audioUrl: audioUpload.secure_url,
        audioPublicId: audioUpload.public_id,
        thumbnailUrl: thumbnailUpload.secure_url,
        thumbnailPublicId: thumbnailUpload.public_id,
        duration: 0, // Will be updated when audio is loaded in the client
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        console.error("Firestore save error:", error);
        throw new Error("Failed to save sermon data");
      });

    return NextResponse.json({
      id: sermonDoc.id,
      message: "Sermon uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to upload sermon",
      },
      { status: 500 }
    );
  }
}
