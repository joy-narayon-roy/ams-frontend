// import React, { Component } from "react";
// import Input_container from "../Input_container";
// export default class Create_web_account extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user_name: "",
//       web_address: "https://www.",
//       email_address: "",
//       phone_number: "",
//       password: "",
//       re_password: "",
//     };
//   }

//   handel_input = ({ target }) => {
//     let { navigator } = this.context;
//     let { name, value } = target;
//     if (name == "web_address") {
//       if (!value.match("https://")) {
//         return true;
//       }
//       try {
//         let url = new URL(value);
//         url.hostname.split(".").forEach((web_name) => {
//           switch (web_name) {
//             case "facebook":
//               navigator("facebook");
//               break;
//           }
//         });
//       } catch (err) {
//         console.log(err.message);
//       }
//     }
//     this.setState({
//       [name]: value,
//     });
//   };

//   componentDidUpdate() {
//     this.context.setData(this.state);
//     return true;
//   }

//   render() {
//     let {
//       user_name,
//       web_address,
//       email_address,
//       phone_number,
//       password,
//       re_password,
//     } = this.state;
//     let { handel_input } = this;
//     return (
//       <>
//         <Input_container
//           title="User Name :"
//           input_name="user_name"
//           input_type="text"
//           input_placeholder="Enter your Name"
//           input_value={user_name}
//           on_input={handel_input}
//           input_reqired={true}
//         />
//         <Input_container
//           title="Web Address :"
//           input_type="url"
//           input_name="web_address"
//           input_placeholder="Enter your Website Address "
//           input_value={web_address}
//           on_input={handel_input}
//           input_reqired={true}
//         />
//         <Input_container
//           title="Email Address :"
//           input_type="email"
//           input_name="email_address"
//           input_placeholder="Enter your Email"
//           input_value={email_address}
//           on_input={handel_input}
//         />
//         <Input_container
//           title="Phone Number :"
//           input_type="tel"
//           input_name="phone_number"
//           input_placeholder="Enter your Phone number"
//           input_value={phone_number}
//           on_input={handel_input}
//         />
//         <Input_container
//           title="Password :"
//           input_type="password"
//           input_name="password"
//           input_placeholder="Enter Password"
//           input_value={password}
//           on_input={handel_input}
//           button={true}
//         />
//         <Input_container
//           title="Re-enter Password :"
//           input_type="password"
//           input_name="re_password"
//           input_placeholder="Re-enter Password"
//           input_value={re_password}
//           on_input={handel_input}
//           button={true}
//         />
//       </>
//     );
//   }
// }

export default function CreateWebAccount() {
  return <div>CreateWebAccount</div>;
}
