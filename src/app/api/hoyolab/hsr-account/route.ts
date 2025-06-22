"use server"

import { NextResponse } from "next/server";
import axios from "axios"

export async function GET() {
  try {
   const response = await axios.get("https://api.mihomo.me/sr_info_parsed/812226331?lang=en")
    const data = response.data.player;

    console.log(data)
    return NextResponse.json(data);
  } catch (e) {
    console.log(e)
    return NextResponse.json({ error: "Failed to fetch status" });
 }
}