import phone_img from "../images/phone.png";
import email_img from "../images/email.png";
import web_img from "../images/web.png";
import app_img from "../images/app.png";
import default_img from "../images/app_logo.png";
import { facebook_icon } from "../images/socials";

export default function (entity: string | undefined) {
  if (!entity) {
    return default_img;
  }
  switch (entity.toLowerCase()) {
    case "facebook":
      return facebook_icon;
    case "phone":
      return phone_img;
    case "email":
      return email_img;
    case "web":
      return web_img;
    case "app":
      return app_img;
    default:
      return default_img;
  }
}
