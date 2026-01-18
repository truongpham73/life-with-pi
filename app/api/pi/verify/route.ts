// API Route: Verify Access Token
// POST /api/pi/verify

import { type NextRequest, NextResponse } from "next/server"
import { verifyAccessToken } from "@/lib/pi-sdk/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessToken } = body

    if (!accessToken) {
      return NextResponse.json({ success: false, error: "Access token is required" }, { status: 400 })
    }

    // Verify với Pi Server
    const result = await verifyAccessToken(accessToken)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }

    // Tạo session hoặc JWT cho user
    // await createUserSession(result.data)

    return NextResponse.json({ success: true, data: result.data })
  } catch (error) {
    console.error("[API] Verify token error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
