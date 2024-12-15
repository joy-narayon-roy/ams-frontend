function titleConverter(str: string) {
  return str ? `${str[0].toUpperCase()}${str.slice(1, str.length)}` : "";
}

export default titleConverter;
