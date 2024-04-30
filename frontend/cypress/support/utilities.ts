export const hexToRgb = (hex: string): string => {
  let r = 0;
  let g = 0;
  let b = 0;

  if (hex.length === 4) {
    r = parseInt(`${hex[1]}${hex[1]}`, 16);
    g = parseInt(`${hex[2]}${hex[2]}`, 16);
    b = parseInt(`${hex[3]}${hex[3]}`, 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export const USERNAME = "Username";
export const PASSWORD = "Password";
export const EMAIL = "cypress@hotmail.com";
export const GREEN = "rgb(0, 128, 0)";
export const TITLE = "Cypress title";
