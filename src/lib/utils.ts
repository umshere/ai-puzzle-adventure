export function cn(...inputs: Array<string | boolean | undefined | null>) {
  return inputs
    .flat()
    .filter((x) => typeof x === "string")
    .join(" ")
    .trim();
}
