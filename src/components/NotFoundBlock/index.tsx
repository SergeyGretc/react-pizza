import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>{":("}</span>
        <br />
        Ничего не найденно
      </h1>
    </div>
  );
};

export default NotFoundBlock;
