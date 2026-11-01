import { describe, expect, it } from "vitest";
import { computePeaks } from "@/lib/audio/peaks";

describe("forme d'onde", () => {
  it("résume un canal en pics", () => {
    const channel = new Float32Array([0, 0.2, -0.8, 0.1, 0.4, -0.2]);
    const peaks = computePeaks(channel, 2);
    expect(peaks).toHaveLength(2);
    expect(peaks[0]).toBeCloseTo(0.8);
    expect(peaks[1]).toBeGreaterThan(0);
  });
});
