import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('apiToken')?.value

    if (!token) {
      return NextResponse.json(
        {
          message: 'No has iniciado sesión',
          authenticated: false,
          token: null,
        },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        message: 'Token recuperado correctamente',
        authenticated: true,
        token,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al recuperar el token' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('apiToken')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'No has iniciado sesión' },
        { status: 401 }
      )
    }

    const response = NextResponse.json(
      { message: 'Sesión cerrada correctamente' },
      { status: 200 }
    )

    response.cookies.set('apiToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al cerrar sesión' },
      { status: 500 }
    )
  }
}