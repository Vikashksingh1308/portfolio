const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = "Vikashksingh1308";

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

export async function getGitHubRepos() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30&type=public`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getRepoDetails(repo: string) {
  const [repoRes, readmeRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo}/readme`, {
      headers: { ...headers, Accept: "application/vnd.github.raw+json" },
      next: { revalidate: 3600 },
    }),
  ]);

  const repoData = repoRes.ok ? await repoRes.json() : null;
  const readmeText = readmeRes.ok ? await readmeRes.text() : null;

  return { repoData, readmeText };
}

export async function getOpenSourceContributions() {
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:${GITHUB_USER}+type:pr&sort=created&order=desc&per_page=20`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}
