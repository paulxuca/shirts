export const totalEntryCost = (sizeData, cost) => {
  const totalItems = sizeData.reduce((total, each) => {
    if (typeof each === 'number') {
      return total + Number(each);
    }
    return total;
  }, 0);
  const numbersCost = (sizeData.get('addNumbers')) ? (totalItems * 2.5) : 0;
  const namesCost = (sizeData.get('addNames')) ? (totalItems * 4.5) : 0;
  return ((totalItems * cost) + numbersCost + namesCost).toFixed(2);
};

