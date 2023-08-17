const getNonEmptyString: (id: string) => String | null = (id) => {
  const inputHtml = document.getElementById(id) as HTMLInputElement;
  const s = inputHtml.value.trim();
  if (s.length === 0) {
    return null;
  }
  return s;
};

export default getNonEmptyString;