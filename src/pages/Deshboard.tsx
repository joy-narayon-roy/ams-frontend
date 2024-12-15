import styles from "../styles/pages_styles/deshboard.module.css";

import { useAuthContext } from "../contexts/AuthContext";
import Accounts from "../components/Accounts";

export default function Deshboard() {
  const { user } = useAuthContext();
  //   console.log(user);
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
        {user && (
          <Accounts
            styles={styles}
            title="Phones"
            datas={user && user.phones}
            data_type={"phone"}
          />
        )}

        {user && (
          <Accounts
            styles={styles}
            title="Email"
            datas={user && user.emails}
            data_type={"email"}
          />
        )}
      </main>
    </>
  );
}
