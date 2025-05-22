export async function fetchGitHubContributions(username: string) {
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
    headers: {
      Accept: 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch GitHub contributions');
  return response.json();
}