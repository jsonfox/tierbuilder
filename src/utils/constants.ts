// List of default images for debugging
const getImageUrl = (i: number) =>
  new URL(
    `../assets/images/test${i < 10 ? '0' + i : i.toString()}.png`,
    import.meta.url
  ).href;
export const IMAGE_LIST = Array.from(Array(15), (v, i) => getImageUrl(i + 1));

// // Default rows
// export const DEFAULT_ROWS = [
//   { name: 'A', color: 'green' },
//   { name: 'B', color: 'lightgreen' },
//   { name: 'C', color: 'yellow' },
//   { name: 'D', color: 'orange' },
//   { name: 'F', color: 'red' }
// ].map(({ name, color }) => createRow(name, color));

// Constants for copy to clipboard feedback
export const copySuccessText = 'Copied!';
export const copyErrorText = 'Error copying!';
export const copyStatusResetTimer = 2000;
