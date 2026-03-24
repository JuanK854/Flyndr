import { NextResponse } from 'next/server';
import { getSearchHistory, clearSearchHistory } from '@/app/lib/db';

export async function GET() {
  try {
    const history = await getSearchHistory(15);
    return NextResponse.json({ success: true, history });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener historial', message: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await clearSearchHistory();
    return NextResponse.json({ success: true, message: 'Historial eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al limpiar historial', message: error.message }, { status: 500 });
  }
}
