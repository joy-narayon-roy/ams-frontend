import { Component } from "react";
import Input_container from "../InputContainer";
import { Email } from "../../models";

type ComponentsProps = {
  data: Email | null;
};

type State = {
  user_name: string;
  address: string;
  phone_number: string;
  password: string;
};

export default class Create_email extends Component<ComponentsProps, State> {
  constructor(props: { data: Email | null }) {
    super(props);
    const { data } = this.props ?? { data: {} };
    if (data) {
      this.state = {
        user_name: data.user_name ?? "",
        address: data.address ?? "",
        phone_number: data.phone ? data.phone.number : data.phone_number ?? "",
        password: data.password ?? "",
        // re_password: "",
      };
    } else {
      this.state = {
        user_name: "",
        address: "",
        phone_number: "",
        password: "",
        // re_password: "",
      };
    }
    // console.log(this);
  }

  handel_input = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.target;

    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>); // Ensure TypeScript knows the key is part of the state
  };
  render() {
    const { user_name, address, phone_number, password } = this.state;
    return (
      <>
          <Input_container
            title="User Name :"
            input_type="text"
            input_name="user_name"
            input_reqired={true}
            input_placeholder="Enter your user name"
            on_input={this.handel_input}
            input_value={user_name}
          />
          <Input_container
            title="Email Address :"
            input_type="email"
            input_name="address"
            input_reqired={true}
            input_placeholder="Enter your email address"
            on_input={this.handel_input}
            input_value={address}
          />
          <Input_container
            title="Enter Phone Number :"
            input_type="tel"
            input_name="phone_number"
            input_placeholder="Enter your Phone Number"
            on_input={this.handel_input}
            input_value={phone_number}
          />
          <Input_container
            title="Password :"
            input_type="password"
            input_name="password"
            input_placeholder="Enter your password"
            input_reqired={true}
            button={true}
            on_input={this.handel_input}
            input_value={password}
          />
          {/* <Input_container
          title="Re-enter Password :"
          input_type="password"
          input_name="re_password"
          input_placeholder="Re-enter password"
          input_reqired={true}
          button={true}
          on_input={this.handel_input}
          input_value={re_password}
        /> */}
        {/* </form> */}
      </>
    );
  }
}
