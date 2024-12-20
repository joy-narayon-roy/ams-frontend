import { Component } from "react";
import InputContainer from "../InputContainer";

import Radio_input from "../RadioInput";
import { Phone } from "../../models";

type ComponentsProps = {
  data: Phone | null;
};

type State = {
  user_name: string;
  number: string;
  registered_by: string;
  active: boolean | null;
};

export default class CreatePhone extends Component<ComponentsProps, State> {
  constructor(props: { data: Phone | null }) {
    super(props);
    this.state = {
      user_name: props.data ? props.data.user_name : "",
      number: props.data ? props.data.number : "",
      registered_by: props.data ? props.data.registered_by : "",
      active: props.data ? props.data.active : true,
    };
  }

  handel_input = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.target;

    // Use TypeScript to handle dynamic keys safely
    if (name === "active") {
      this.setState((prevState) => ({
        active: !prevState.active,
      }));
    } else {
      this.setState({
        [name]: value,
      } as unknown as Pick<State, keyof State>); // Ensure TypeScript knows the key is part of the state
    }
  };

  render() {
    const { user_name, number, registered_by, active } = this.state;
    return (
      <>
        {/* <form className="px-6 py-3" id="inputForm"> */}
        <InputContainer
          title="User Name"
          input_type="text"
          input_name="user_name"
          input_value={user_name}
          on_input={this.handel_input}
          input_required={true}
          input_placeholder="Enter user name"
        />
        <InputContainer
          title="Phone Number"
          input_type="tel"
          input_name="number"
          input_value={number}
          on_input={this.handel_input}
          input_required={true}
          input_placeholder="Enter phone number"
          />
        <InputContainer
          input_type="text"
          title="Registered Name"
          input_name="registered_by"
          on_input={this.handel_input}
          input_value={registered_by}
          input_required={true}
          input_placeholder="Enter registered name"
        />
        <Radio_input on_input={this.handel_input} input_value={active} />
        {/* </form> */}
      </>
    );
  }
}
