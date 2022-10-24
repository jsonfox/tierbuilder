const getImageUrl = (i: number) =>
  new URL(
    `../assets/images/test${i < 10 ? '0' + i : i.toString()}.png`,
    import.meta.url
  ).href;

// List of default images for debugging
export const IMAGE_LIST = Array.from(Array(15), (v, i) => getImageUrl(i + 1));

// Label colors
export const COLORS = [
  "#FF7F7F",
  "#FFBF7F",
  "#FFDF7F",
  "#FFFF7F",
  "#BFFF7F",
  "#7FFF7F",
  "#7FFFFF",
  "#7FBFFF",
  "#1DA1F2",
  "#7F7FFF",
  "#BF7FBF",
  "#FF7FFF",
  "#666666",
  "#BBBBBB",
  "#EDEDED",
  "#FFFFFF"
]

// Constants for copy to clipboard feedback
export const copySuccessText = 'Copied!';
export const copyErrorText = 'Error copying!';
export const copyStatusResetTimer = 2000;
