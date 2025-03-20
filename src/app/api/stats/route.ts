import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("church-sermon");

    // Get total sermons count
    const sermonsCount = await db.collection("sermons").countDocuments();

    // Get total views (sum of all sermon views)
    const viewsAggregation = await db
      .collection("sermons")
      .aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$views" },
          },
        },
      ])
      .toArray();
    const totalViews = viewsAggregation[0]?.totalViews || 0;

    // Get active users (users who logged in in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = await db.collection("users").countDocuments({
      lastLogin: { $gte: thirtyDaysAgo },
    });

    // Get total watch time in hours
    const watchTimeAggregation = await db
      .collection("sermons")
      .aggregate([
        {
          $group: {
            _id: null,
            totalDuration: { $sum: "$duration" },
          },
        },
      ])
      .toArray();
    const totalWatchTime =
      Math.round(watchTimeAggregation[0]?.totalDuration / 3600) || 0; // Convert seconds to hours

    // Get recent sermons
    const recentSermons = await db
      .collection("sermons")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    return NextResponse.json({
      stats: {
        sermonsCount,
        totalViews,
        activeUsers,
        totalWatchTime,
      },
      recentSermons,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
