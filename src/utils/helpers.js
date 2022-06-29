export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(number / 100);
  //   Divide by 100 since prices are in cents
};

export const getUniqueValues = (data, type) => {
  let values = data.map((item) => item[type]);
  // console.log(...new Set(values));
  if (type === "colors") {
    values = values.flat();
    // console.log(values);
  }
  return ["all", ...new Set(values)];
};
