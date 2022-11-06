export const getNextUniqueIncrementalId = (list: { id: number }[]) => {
  const lastId = list.reduce((acc, { id }) => {
    if (id > acc) {
      return id;
    }

    return acc;
  }, 0);

  return lastId + 1;
};
