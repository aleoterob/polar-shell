/** Resolves a CSS custom property (e.g. oklch) to a computed `rgb()` string for canvas APIs. */
export function resolveCssVariableColor(
  variableName: `--${string}`,
  fallback: string,
): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  if (!raw) {
    return fallback;
  }

  const probe = document.createElement('div');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.backgroundColor = raw;
  document.documentElement.appendChild(probe);
  const resolved = getComputedStyle(probe).backgroundColor;
  probe.remove();

  return resolved && resolved !== 'rgba(0, 0, 0, 0)' ? resolved : fallback;
}
