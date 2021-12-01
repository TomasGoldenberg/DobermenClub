export const removeUnderscoreAndCapitalize = (string) => {
  const wordArray = string.split('_');
  const parsedWordArray = wordArray.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return parsedWordArray.join().replace(/,/g, ' ');
};
