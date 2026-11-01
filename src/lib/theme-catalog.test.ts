import { describe, expect, it } from "vitest";
import { easterSunday, resolveAutomaticTheme } from "@/lib/theme-catalog";

function atParis(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00+01:00`);
}

describe("thème automatique", () => {
  it("calcule Pâques 2026", () => {
    const easter = easterSunday(2026);
    expect(easter.getUTCFullYear()).toBe(2026);
    expect(easter.getUTCMonth() + 1).toBe(4);
    expect(easter.getUTCDate()).toBe(5);
  });

  it("applique les périodes festives et saisonnières", () => {
    expect(resolveAutomaticTheme(atParis("2026-10-31"))).toBe("halloween");
    expect(resolveAutomaticTheme(atParis("2026-12-20"))).toBe("christmas");
    expect(resolveAutomaticTheme(atParis("2027-01-01"))).toBe("newyear");
    expect(resolveAutomaticTheme(atParis("2026-02-14"))).toBe("valentine");
    expect(resolveAutomaticTheme(atParis("2026-03-17"))).toBe("stpatrick");
    expect(resolveAutomaticTheme(atParis("2026-07-14"))).toBe("bastille");
    expect(resolveAutomaticTheme(atParis("2026-09-05"))).toBe("backtoschool");
    expect(resolveAutomaticTheme(atParis("2026-04-05"))).toBe("easter");
    expect(resolveAutomaticTheme(atParis("2026-06-15"))).toBe("spring");
    expect(resolveAutomaticTheme(atParis("2026-07-20"))).toBe("summer");
    expect(resolveAutomaticTheme(atParis("2026-10-10"))).toBe("autumn");
    expect(resolveAutomaticTheme(atParis("2026-01-20"))).toBe("winter");
  });
});
