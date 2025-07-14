// export const totalCalculator = (
//   numbersCollection: object[],
//   propertyName: string
// ) => {
//   const total =
//     numbersCollection?.length > 0 &&
//     numbersCollection
//       ?.map((singleItem: any) => singleItem[propertyName])
//       ?.reduce((total: number, num: number) => +total + +num, 0);
//   const discount =
//     numbersCollection?.length > 0 &&
//     numbersCollection
//       ?.map((singleItem: any) => singleItem["previousAmount"])
//       ?.reduce((total: number, num: number) => +total + +num, 0);

//   return total - discount;
// };


export const totalCalculator = (
  numbersCollection: Record<string, unknown>[],
  propertyName: string
) => {
  const total =
    numbersCollection?.length > 0 &&
    numbersCollection
      ?.map((singleItem) => singleItem[propertyName])
      ?.reduce((total: number, num: unknown) => +total + +(num as number), 0);
  const discount =
    numbersCollection?.length > 0 &&
    numbersCollection
      ?.map((singleItem) => singleItem["previousAmount"])
      ?.reduce((total: number, num: unknown) => +total + +(num as number), 0);

  return Number(total) - Number(discount);
};