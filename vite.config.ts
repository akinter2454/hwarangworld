import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function resolveBasePath() {
  const env = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
  const explicit = env.VITE_BASE_PATH?.trim();
  if (explicit) return explicit.endsWith('/') ? explicit : `${explicit}/`;

  const repository = env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
  const owner = env.GITHUB_REPOSITORY_OWNER ?? '';

  // 사용자/조직 Pages 저장소(예: username.github.io)는 루트 경로를 사용합니다.
  if (repository && owner && repository.toLowerCase() === `${owner.toLowerCase()}.github.io`) return '/';

  // 일반 프로젝트 Pages는 /저장소이름/ 경로에서 서비스됩니다.
  if (repository) return `/${repository}/`;

  // 로컬 개발 및 기타 정적 호스팅의 기본값입니다.
  return '/';
}

export default defineConfig({
  base: resolveBasePath(),
  plugins: [react()],
  server: { host: true },
});
