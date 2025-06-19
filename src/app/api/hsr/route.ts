"use server"

import { hsr } from "@/app/utils/account";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const noteData = await hsr.record.note()
    const forgottenHallData = await hsr.record.forgottenHall()  
    
    return NextResponse.json({
      noteData: noteData,
      forgottenHallData: forgottenHallData,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch status" });
 }
}