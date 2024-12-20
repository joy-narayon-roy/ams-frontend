import { useAlert } from "./contexts/AlertContext";

export default function Test() {
  const { addAlert } = useAlert();
  const sendAlert = () => {
    // console.log("alert");
    addAlert("success", "Hi i am joy.");
  };
  return (
    <>
      <button onClick={sendAlert}>Alert</button>
    </>
  );
}
