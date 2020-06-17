export const paleColor = (rgbaColor) => {
  if (!rgbaColor) return undefined;
  const colorStringMatch = rgbaColor.match(/\((.+)\)/);
  if (!colorStringMatch) return undefined;
  const colorString = colorStringMatch[1];
  const [r, g, b, a] = colorString.split(/,\s?/);
  const reconstructedColor = `rgba(${r},${g},${b},${Number(a) * 0.1})`;
  return reconstructedColor;
};
