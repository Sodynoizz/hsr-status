"use server"

import { hsr } from "@/app/utils/account";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const daily = await hsr.daily.info()
    const rewards = await hsr.daily.rewards()

    return NextResponse.json({
      total_sign_day: daily.total_sign_day,
      reward: rewards.awards[daily.total_sign_day - 1]
    })
    return 
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch status" });
 }
}