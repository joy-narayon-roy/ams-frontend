import image404 from "../../images/404-error.png";

export default function NotFound() {
  return (
    <>
      <div>
        <img
          className="block mx-auto opacity-40"
          style={{ width: "50%" }}
          src={image404}
          alt="Image"
        />
        <h1 className="text-center text-4xl opacity-60" >Details not found</h1>
      </div>
    </>
  );
}
