import React from "react";
import styles from "./.module.css";

interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  bodyStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  classNames?: {
    table?: string;
    row?: string;
    cell?: string;
    header?: string;
  };
  className?: string;
}

export default function Table<T>(props: TableProps<T>) {
  const { columns, data, classNames, className } = props;

  return (
    <div className={`${styles["table-container"]} ${className || ""}`}>
      <table className={`${styles["main-table"]} ${classNames?.table || ""}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${styles["th"]} ${classNames?.header || ""}`}
                style={column.headerStyle}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${styles["tr"] || ""} ${classNames?.row || ""}`}
              style={(row as any)?.rowStyle || {}}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`${styles["td"]} ${classNames?.cell || ""}`}
                  style={column.bodyStyle} // Apply the body style
                >
                  {column.render
                    ? column.render(row)
                    : (row as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
