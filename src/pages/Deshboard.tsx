import styles from "../styles/pages_styles/deshboard.module.css";

import { useAuthContext } from "../contexts/AuthContext";
import Accounts from "../components/Accounts";
import { useEffect } from "react";

export default function Deshboard() {
  const { profile } = useAuthContext();
  useEffect(() => {
    document.title = "AMS - Deshboard";
  }, []);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.search}>
          <button className="search_btn">
            <img src="../images/filter.png" alt="" />
          </button>
          <div className="tags"></div>

          <div className="inputs">
            <input type="search" className="" placeholder="Search.." />
            <ol>
              <li>Google</li>
              <li>Facebook</li>
            </ol>
          </div>

          <button className="search_btn">
            <img src="../images/search.png" alt="" />
          </button>
        </section>
        {profile && (
          <Accounts
            styles={styles}
            title="Phones"
            datas={profile && profile.phones}
            data_type={"phone"}
          />
        )}

        {profile && (
          <Accounts
            styles={styles}
            title="Email"
            datas={profile && profile.emails}
            data_type={"email"}
          />
        )}
      </main>
    </>
  );
}
