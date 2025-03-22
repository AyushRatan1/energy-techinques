import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '/'
  
  try {
    revalidatePath(path)
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path
    })
  } catch (err) {
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      path,
      error: (err as Error).message
    }, { status: 500 })
  }
} 