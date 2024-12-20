function parseForm(form: HTMLFormElement | HTMLElement | null) {
  const inputs = form ? [...form.getElementsByTagName("input")] : [];
  inputs.forEach((inp: HTMLInputElement) => {
    inp.checkValidity();
  });

  const updatedData = inputs.reduce<Record<string, string | number | boolean>>(
    (pre, curr) => {
      if (curr.type == "number") {
        pre[curr.name] = parseInt(curr.value);
      } else if (curr.type == "checkbox") {
        pre[curr.name] = curr.checked;
      } else {
        pre[curr.name] = curr.value;
      }
      return pre;
    },
    {}
  );
  return updatedData;
}

export default parseForm;
