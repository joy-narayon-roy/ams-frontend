import {
  at_logo,
  bl_logo,
  gp_logo,
  ro_logo,
  sim,
  te_logo,
} from "../images/sims";

export default function getOperator(simNumber: string) {
  const cleanNumber = simNumber.replace(/\D/g, "");
  const numberLength = cleanNumber.length;

  if (numberLength === 11 && cleanNumber.startsWith("01")) {
    const operatorCode = cleanNumber.substr(0, 3);

    switch (operatorCode) {
      case "017":
      case "013":
        return { name: "Grameenphone", src: gp_logo };
      case "014":
      case "019":
        return { name: "Banglalink", src: bl_logo };
      case "016":
        return { name: "Airtel", src: at_logo };
      case "018":
        return { name: "Robi", src: ro_logo };
      case "015":
        return { name: "Teletalk", src: te_logo };
      default:
        return { name: "Unknown Operator", src: sim };
    }
  } else {
    return { name: "Invalid", src: "" };
  }
}
