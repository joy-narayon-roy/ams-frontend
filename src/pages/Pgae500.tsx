import { useEffect } from "react";
import image500 from "../images/500img.png";
import { Navigate, useLocation } from "react-router";

export default function Page500() {
  const location = useLocation();

  useEffect(() => {
    document.title = "AMS - Some Error.";
  }, []);

  return (
    <>
      {!location.state ? (
        <Navigate to={"/"} />
      ) : (
        <main>
          <div>
            <img src={image500} alt="Image" />
          </div>
        </main>
      )}
    </>
  );
}
