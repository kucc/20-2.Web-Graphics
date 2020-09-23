export const createDivWithId = (id: string) => {
  const div = document.createElement("div");
  div.id = id;

  return div;
};

export const addOutputDivOnBody = () => {
  const div = createDivWithId("output");
  document.getElementsByTagName("body")[0].appendChild(div);
};
