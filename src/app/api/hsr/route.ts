"use server"

import { hsr } from "@/app/utils/account";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const noteData = await hsr.record.note()
    const forgottenHallData = await hsr.record.forgottenHall()  
    const recordData = await hsr.record.records()
    
    return NextResponse.json({
      noteData: noteData,
      forgottenHallData: forgottenHallData,
      recordData: recordData
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch status" });
 }
}