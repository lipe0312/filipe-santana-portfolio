export function getStaggerDelay(index: number): number {
  const maxDelay = 150;
  const step = 50;
  return Math.min(index * step, maxDelay);
}
