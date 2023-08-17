const setInvalid = (e: HTMLInputElement) => {
  e.classList.remove('is-valid');
  e.classList.add('is-invalid');
  setTimeout(() => { // TODO if multiple times called, only last one should be invalid
    e.classList.remove('is-invalid');
  }, 2000);
};

export default setInvalid;