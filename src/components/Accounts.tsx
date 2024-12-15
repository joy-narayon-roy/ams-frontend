import { useNavigate } from "react-router-dom";
import add_icon from "../images/add.png";
import pdf_downlaod from "../images/pdf_download.png";
// import Vertical_card from "./Vertical_card";
import Empty from "./Empty";
import ArrayObj from "../models/ArrayObj";
import { Email, Phone } from "../models";
import Vertical_card from "./Vertical_card";

interface AccountsProps {
  title: string;
  styles: { [key: string]: string };
  datas?: ArrayObj;
  data_type?: string | boolean;
}

export default function Accounts({
  title,
  styles,
  datas = new ArrayObj(),
  data_type = false,
}: AccountsProps) {
  const nav = useNavigate();

  function goto_details({
    data: info,
  }: {
    data: Email | Phone;
    provider: object;
  }): void {
    if (info instanceof Email) {
      nav(`/details/email/${info.id}`);
    } else if (info instanceof Phone) {
      nav(`/details/phone/${info.id}`);
    }
  }

  function goto_create(): void {
    nav("/create/" + (data_type || ""), { state: data_type || undefined });
  }

  return (
    <section className={styles.account_container}>
      <div className={styles["account_container-top"]}>
        <div className={styles["account_container-top_left"]}>
          <h3>{title}</h3>
        </div>

        <div className={styles["account_container-top_right"]}>
          <button>
            <img
              src={pdf_downlaod}
              alt="Download PDF"
              className={styles.icon}
            />
          </button>

          <button onClick={goto_create}>
            <img src={add_icon} alt="Add" className={styles.icon} />
          </button>
        </div>
      </div>

      <div className={styles["account_container-cards"]}>
        {datas.length === 0 && <Empty />}
        {datas.map(({ key, value }: { key: string; value: Phone | Email }) => (
          <Vertical_card
            on_click={goto_details}
            dataId={key}
            key={key}
            data={value}
          />
        ))}
      </div>
    </section>
  );
}
