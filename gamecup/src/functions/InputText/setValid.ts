const setValid = (e: HTMLInputElement) => {
  e.classList.remove('is-invalid');
  e.classList.add('is-valid');
  setTimeout(() => { // TODO if multiple times called, only last one should be valid
    e.classList.remove('is-valid');
  }, 2000);
};

export default setValid;