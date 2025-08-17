import { NextResponse } from 'next/server';
import { Character } from '../../../interfaces/apiInterface';

export async function POST(req: Request) {
  const cards: Character[] = await req.json();

  const headers = ['Name', 'Status', 'Species'];
  const rows = cards.map((card) =>
    [card.name, card.status, card.species].join(',')
  );
  const csvFile = [headers.join(','), ...rows].join('\n');

  return new NextResponse(csvFile, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${cards.length}_items.csv"`,
    },
  });
}
