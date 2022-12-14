// List of default images for debugging
export const IMAGE_LIST = Array.from(
  Array(15),
  (v, i) => new URL(`../assets/images/test${i}.png`, import.meta.url).href
);

// Default row names
export const ROW_NAMES = ['S', 'A', 'B', 'C', 'D'];

// Label colors
export const COLORS = [
  '#FF7F7F',
  '#FFBF7F',
  '#FFDF7F',
  '#FFFF7F',
  '#BFFF7F',
  '#7FFF7F',
  '#7FFFFF',
  '#7FBFFF',
  '#1DA1F2',
  '#7F7FFF',
  '#BF7FBF',
  '#FF7FFF',
  '#666666',
  '#BBBBBB',
  '#EDEDED',
  '#FFFFFF'
];
