export default function (form: HTMLElement | null) {
  if (form instanceof HTMLFormElement) {
    return form.reportValidity()
    // return form.checkValidity();
    // const inputTags = [...form.getElementsByTagName("input")];
    // inputTags.forEach((inp) => {
    //   console.log(inp, inp.required);
    // });
  }
  return false;
}
