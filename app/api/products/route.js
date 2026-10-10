import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get('sport');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');

  let results = [...products];

  if (sport && sport !== 'All') {
    results = results.filter(
      (p) => p.sport.toLowerCase() === sport.toLowerCase()
    );
  }

  if (search && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sport.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  return NextResponse.json({
    total: results.length,
    products: results,
  });
}
