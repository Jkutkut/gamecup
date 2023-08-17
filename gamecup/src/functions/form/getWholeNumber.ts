const getWholeNumber: (id: string) => number | null = (id) => {
  const input = document.getElementById(id) as HTMLInputElement;
  try {
    const nbr = parseInt(input.value.trim());
    if (isNaN(nbr))
      return null;
    return nbr;
  } catch (e) {
    return null;
  }
}

export default getWholeNumber;