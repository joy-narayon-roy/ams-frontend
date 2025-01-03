import { useEffect } from "react";
import image404 from "../images/404img.png";

export default function PageNotFound() {
  useEffect(() => {
    document.title = "AMS - Page not found.";
  }, []);

  return (
    <>
      <main>
        <div>
          <img src={image404} alt="Image" />
        </div>
      </main>
      ;
    </>
  );
}
