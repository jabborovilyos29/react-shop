export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

export const deleteItem = (product) => {
  return {
    type: "DELETEITEM",
    payload: product,
  };
};

export const deleteProduct = (product) => {
  return {
    type: "DELETEPRODUCT",
    payload: product,
  };
};
