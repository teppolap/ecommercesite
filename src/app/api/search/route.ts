import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/client";
import { groq } from "next-sanity";

const searchQuery = groq`*[_type == 'product' && title match $pattern][0...10]{
  _id,
  title,
  "slug": slug.current,
  image
}`;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) {
    return NextResponse.json([]);
  }
  const pattern = `*${q}*`;
  try {
    const results = await client.fetch(searchQuery, { pattern });
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
