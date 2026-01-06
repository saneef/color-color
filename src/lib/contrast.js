/**
 * Determines whether the specified contrast is minimum text AA contrast.
 *
 * @param      {number}   contrast  The Contrast
 * @return     {boolean}  True if the specified contrast is minimum text AA contrast, False otherwise.
 */
export function isMinimumTextAAContrast(contrast) {
  return contrast >= 4.5;
}

/**
 * Determines whether the specified contrast is minimum text AAA contrast.
 *
 * @param      {number}   contrast  The contrast
 * @return     {boolean}  True if the specified contrast is minimum text AAA contrast, False otherwise.
 */
export function isMinimumTextAAAContrast(contrast) {
  return contrast >= 7;
}
