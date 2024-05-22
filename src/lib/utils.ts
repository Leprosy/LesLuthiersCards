/**
 * Get a random element from array
 *
 * @param arr a random of elements of any type
 * @returns random item
 */
export const arrRand = (arr: Array<unknown>) => arr[Math.round(Math.random() * (arr.length - 1))];

/**
 * Get a normalized version of a string, works for getting a card by name
 *
 * @param name
 * @returns a slugified version
 */
export const getSlug = (name: string) => {
  let slug = "";
  slug = name.trim();
  slug = slug.toLowerCase();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug.replace(/ /g, "-");

  return slug;
};

/**
 * Shuffles an array
 * @param array
 */
export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
};