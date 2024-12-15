import email_icones from "../images/emails";
import default_email from "../images/email.png";

function getEmailProvider({ type }: { type: string }) {
  if (!type) {
    return { name: "", src: null };
  }

  const name = `${type[0]}${type.slice(1, type.length).toLowerCase()}`;
  const src_id = `${type.toLowerCase()}_img`;

  return {
    name,
    src:
      src_id in email_icones
        ? email_icones[src_id as keyof typeof email_icones]
        : default_email,
  };
}

export default getEmailProvider;

// import email_icones from "../images/emails";
// import default_email from "../images/email.png";

// function getEmailProvider({ type }: { type: string }) {
//   if (!type) {
//     return { name: "", src: null };
//   }
//   // email_icones
//   const name = `${type[0]}${type.slice(1, type.length).toLowerCase()}`;
//   const src_id = `${type.toLowerCase()}_img`;

//   return {
//     name,
//     src: email_icones[src_id] || default_email,
//   };
// }

// export default getEmailProvider;
