import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export async function GET() {
  try {
    const sermonsRef = db.collection("sermons");
    const querySnapshot = await sermonsRef.orderBy("createdAt", "desc").get();

    const sermons = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toISOString()
              : null,
          updatedAt:
            data.updatedAt instanceof Timestamp
              ? data.updatedAt.toDate().toISOString()
              : null,
        };
      }
    );

    return NextResponse.json(sermons);
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return NextResponse.json(
      { error: "Failed to fetch sermons" },
      { status: 500 }
    );
  }
}
