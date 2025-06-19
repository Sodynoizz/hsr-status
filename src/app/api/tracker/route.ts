"use server"

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get('https://discord-activity-tracker.onrender.com/status');
    const data = await response.data
    
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch status" });
 }
}