import { useState } from "react";
import styles from "../styles/components_styles/header.module.css";
import logo512 from "../images/logo512.png";
import user_icone from "../images/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext/index";
import Button from "./Button";

export default function Header() {
  const navigator = useNavigate();
  const [show_manu, setShow_manu] = useState(false);
  const { user, logout } = useAuthContext();

  function togle_manu() {
    setShow_manu(!show_manu);
  }

  function remove_manu() {
    setShow_manu(false);
  }

  function go_to_home() {
    navigator("/");
  }

  return (
    <>
      <header>
        <section
          onBlur={remove_manu}
          className={styles["container"]}
          // className='mt-0 bg-black'
        >
          <section className={styles["left"]}>
            <img
              onClick={go_to_home}
              src={logo512}
              alt="logo"
              className={styles["logo"]}
            />
            <h1 onClick={go_to_home}>AMS</h1>
          </section>

          <section className={styles["right"]}>
            {user && (
              <>
                <div onClick={togle_manu} className={styles["user-info"]}>
                  <img src={user_icone} alt="" />
                  <h4>{user.name}</h4>
                </div>
                <div
                  id="user_manu"
                  className={`${styles["user-manu"]} ${
                    show_manu && styles["show_manu"]
                  }`}
                >
                  <ul>
                    <Link to="/updateprofile">Update</Link>
                    <Button text="Signout" on_click={logout} />
                  </ul>
                </div>
              </>
            )}
            {!user && (
              <Link className="btn_pri" to="/signin">
                Signin
              </Link>
            )}
          </section>
        </section>
      </header>
    </>
  );
}
