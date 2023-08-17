const removeState = (e: HTMLInputElement) => {
  e.classList.remove('is-invalid');
  e.classList.remove('is-valid');
};

export default removeState;