export function computePeaks(channel: Float32Array, buckets: number): Float32Array {
  const peaks = new Float32Array(Math.max(1, buckets));
  if (channel.length === 0) {
    return peaks;
  }
  const size = Math.max(1, Math.floor(channel.length / peaks.length));
  for (let index = 0; index < peaks.length; index += 1) {
    const start = index * size;
    const end = Math.min(channel.length, start + size);
    let max = 0;
    for (let cursor = start; cursor < end; cursor += 1) {
      const value = Math.abs(channel[cursor] ?? 0);
      if (value > max) {
        max = value;
      }
    }
    peaks[index] = max;
  }
  return peaks;
}
