import { PropsWithChildren } from "react";
import styles from "../styles/modules/components/page-container.module.scss";

export default function PageContainer({children} : PropsWithChildren) {
  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        {children}
      </div>
    </div>
  );
}