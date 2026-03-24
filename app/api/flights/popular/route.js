import { NextResponse } from 'next/server';
import { getPopularRoutes } from '@/app/lib/mockData';

export async function GET() {
  try {
    const routes = getPopularRoutes();
    return NextResponse.json({ success: true, routes });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener rutas populares' }, { status: 500 });
  }
}
