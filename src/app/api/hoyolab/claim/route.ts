"use server"

import { hsr } from "@/app/utils/account";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await hsr.daily.claim()
    console.log(response)
    return NextResponse.json({
      code: response.code,
      info: response.info,
      status: response.status,
    });

  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch status" });
 }
}