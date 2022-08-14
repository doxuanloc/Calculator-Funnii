import styles from "./index.module.scss";
import clsx from "clsx";

function Button(props) {
  const { type, children, ishightlighted } = props;

  const getClassName = (_type) => {
    switch (type) {
      case "delete":
        return styles.delBtn;
      case "calculator":
        return ishightlighted === "true" ? styles.pressedCalBtn : styles.calBtn;
      case "number":
        return styles.numBtn;
      case "result":
        return styles.resultBtn;
      case "back":
        return styles.backBtn;
      default:
        break;
    }
  };

  return (
    <button className={clsx(styles.wrapper, getClassName(type))} {...props}>
      <span>{children}</span>
    </button>
  );
}

export default Button;
