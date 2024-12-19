// import React, { Component } from "react";
// import Input_container from "../Input_container";

// export default class Create_facebook extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user_name: "",
//       profile_link: "",
//       email_address: "",
//       phone_number: "",
//       password: "",
//     };
//   }

//   handel_input = ({ target }) => {
//     let { name, value } = target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   componentDidUpdate() {
//     this.context.setData(this.state);
//     return true;
//   }

//   render() {
//     let { handel_input } = this;
//     let { user_name, profile_link, email_address, phone_number, password } =
//       this.state;
//     return (
//       <>
//         <Input_container
//           title="User Name :"
//           input_type="text"
//           input_placeholder="Enter your Facebook Name"
//           input_name="user_name"
//           input_value={user_name}
//           on_input={handel_input}
//         />
//         <Input_container
//           title="Your Account Link :"
//           input_type="text"
//           input_placeholder="Enter your Profile Link"
//           input_name="profile_link"
//           input_value={profile_link}
//           on_input={handel_input}
//         />
//         <Input_container
//           title="Email address :"
//           input_type="email"
//           input_placeholder="Enter your Email :"
//           input_name="email_address"
//           input_value={email_address}
//           on_input={handel_input}
//         />
//         <Input_container
//           title="Phone Number :"
//           input_type="tel"
//           input_placeholder="Enter Phone :"
//           input_name="phone_number"
//           input_value={phone_number}
//           on_input={handel_input}
//         />
//         <Input_container
//           title="Enter Password :"
//           input_type="password"
//           input_placeholder="Enter Account Password :"
//           input_name="password"
//           input_value={password}
//           on_input={handel_input}
//           button={true}
//         />
//       </>
//     );
//   }
// }

export default function CreateFacebook() {
  return <div>CreateFacebook</div>;
}
