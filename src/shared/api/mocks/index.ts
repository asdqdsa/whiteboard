export async function enableMocking() {
  if (import.meta.env.PROD) return;

  const { worker } = await import('@/shared/api/mocks/browser');
  return worker.start();
}

export async function disableMocking() {
  if (import.meta.env.PROD) return;

  const { worker } = await import('@/shared/api/mocks/browser');
  return worker.stop();
}
