import { NextResponse } from 'next/server';
import { getFavorites, addFavorite, removeFavorite } from '@/app/lib/db';

export async function GET() {
  try {
    const favorites = await getFavorites();
    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener favoritos', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.flightId || !body.airline || !body.origin || !body.destination || !body.price) {
      return NextResponse.json(
        { error: 'Campos requeridos: flightId, airline, origin, destination, price' },
        { status: 400 }
      );
    }

    await addFavorite(body);
    return NextResponse.json({ success: true, message: 'Vuelo agregado a favoritos' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al agregar favorito', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const flightId = searchParams.get('flightId');

    if (!flightId) {
      return NextResponse.json({ error: 'flightId es requerido' }, { status: 400 });
    }

    await removeFavorite(flightId);
    return NextResponse.json({ success: true, message: 'Vuelo eliminado de favoritos' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar favorito', message: error.message }, { status: 500 });
  }
}
