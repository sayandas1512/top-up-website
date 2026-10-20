/** Bottle outline, spans roughly x 30 to 80 and y 8 to 122. Shared by the problem and pilot visuals. */
export const BOTTLE = "M44 8h22v14c0 6 14 12 14 28v62a10 10 0 0 1-10 10H40a10 10 0 0 1-10-10V50c0-16 14-22 14-28Z";

/**
 * Closed sine-wave path for water surfaces inside SVG. It covers `periods` whole periods, so translating it
 * left by exactly one `period` loops seamlessly. The shape runs from the wave line down to `bottom`.
 */
export function sinePath(x0: number, period: number, periods: number, amp: number, baseY: number, bottom: number): string {
  const pts: string[] = [];
  const end = periods * period;
  for (let x = 0; x <= end; x += period / 8) {
    pts.push(`${(x0 + x).toFixed(1)} ${(baseY + Math.sin((x / period) * Math.PI * 2) * amp).toFixed(2)}`);
  }
  return `M${pts.join("L")}L${x0 + end} ${bottom}L${x0} ${bottom}Z`;
}
