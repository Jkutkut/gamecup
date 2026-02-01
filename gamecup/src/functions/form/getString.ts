const getString: (id: string) => String | null = (id) => {
  const inputHtml = document.getElementById(id) as HTMLInputElement;
  const s = inputHtml.value.trim();
  return s;
};

export default getString;
