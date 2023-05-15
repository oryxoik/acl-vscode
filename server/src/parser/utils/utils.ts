export function isLetter(char: string): boolean {
  return /^[a-zA-Z]$/.test(char);
}

export function isDigit(char: string): boolean {
  return /^\d$/.test(char);
}

export function isLetterOrDigit(character: string): boolean {
  return /^[a-zA-Z0-9]$/.test(character);
}
