export const getNextUniqueIncrementalId = (list: { id: number }[]) => {
  const biggestId = list.reduce((acc, { id }) => {
    if (id > acc) {
      return id;
    }

    return acc;
  }, 0);

  return biggestId + 1;
};
