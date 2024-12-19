import { useEffect } from "react";
import image500 from "../images/500img.png";
import { Navigate, useLocation } from "react-router";

export default function Page500() {
  const location = useLocation();
  useEffect(() => {
    document.title = "AMS - Some Error.";
  }, []);

  if (!location.state) {
    return <Navigate to={"/"} />;
  }

  console.log(location.state);

  return (
    <>
      <main>
        <div>
          <img src={image500} alt="Image" />
        </div>
      </main>
      ;
    </>
  );
}
