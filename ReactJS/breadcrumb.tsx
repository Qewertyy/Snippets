import { Link } from "react-router-dom";
import styles from "./.module.css";

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb" className={styles["breadcrumb-nav"]}>
      <ol className={styles.breadcrumb}>
        {items.map((item, index) => (
          <li key={index} className={styles["breadcrumb-item"]}>
            {index < items.length - 1 ? (
              <Link to={item.path} className={styles["breadcrumb-link"]}>
                {item.label}
              </Link>
            ) : (
              <span className={styles["breadcrumb-current"]}>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className={styles["breadcrumb-separator"]}>
                {" "}
                &nbsp;&gt;{" "}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { Breadcrumb };
