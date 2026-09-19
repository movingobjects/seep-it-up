// Boards re-render every frame while building in, so build each pattern once
const cache = new Map<string, string>();

export const getCellPattern = (color: string): string => {
  const cached = cache.get(color);
  if (cached) return cached;

  const svg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32">
    <path
      fill="${color}"
      d="
        M0 1h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4z
        M4 5h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4z
        M0 9h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4z
        M4 13h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4z
        M0 17h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4z
        M4 21h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4z
        M0 25h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4z
        M4 29h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4zm8 0h4v2h-4z
      "/>
  </svg>`;

  const pattern = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  cache.set(color, pattern);

  return pattern;
};
