import { NextResponse } from 'next/server';
import { fetchGitHubContributions } from '@/lib/github';

export async function GET() {
  try {
    const data = await fetchGitHubContributions('ItsKris62');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}