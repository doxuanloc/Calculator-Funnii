import { useState } from "react";
import { KEYBOARDS } from "../../utils/constants";
import Button from "../../components/Button";
import styles from "./index.module.scss";
import sound from "./click-sound.mp3";

function Calculator() {
  const [prevValue, setPrevValue] = useState();
  const [curValue, setCurValue] = useState("0");
  const [operator, setOperator] = useState();
  const [pressedOperator, setPressedOperator] = useState();

  const updatePrevValue = (_operator) => {
    if (_operator) {
      if (_operator === "+") {
        setPrevValue(prevValue + parseFloat(curValue));
      } else if (_operator === "-") {
        setPrevValue(prevValue - parseFloat(curValue));
      } else if (_operator === "x") {
        setPrevValue(prevValue * parseFloat(curValue));
      } else if (_operator === "/") {
        if (prevValue !== 0) {
          setPrevValue(prevValue / parseFloat(curValue));
        }
      }
    } else {
      setPrevValue(parseFloat(curValue));
    }
  };

  const updateResult = (_operator) => {
    if (_operator) {
      if (_operator === "+") {
        setCurValue((prevValue + parseFloat(curValue)).toString());
      } else if (_operator === "-") {
        setCurValue((prevValue - parseFloat(curValue)).toString());
      } else if (_operator === "x") {
        setCurValue((prevValue * parseFloat(curValue)).toString());
      } else if (_operator === "/") {
        setCurValue((prevValue / parseFloat(curValue)).toString());
      }
    }
  };

  const handleButtonPress = (content) => {
    var audio = new Audio(sound);
    audio.play();
    const num = parseFloat(curValue);

    if (curValue[curValue.length - 1] === ".") {
      setCurValue(curValue + content);
    } else {
      if (parseFloat(num + content) <= 999999999) {
        setCurValue(parseFloat(num + content).toString());
      }
    }

    switch (content) {
      case "C":
        setCurValue("0");
        setPrevValue();
        setOperator();
        setPressedOperator();
        break;
      case "%":
        setCurValue((num / 100).toString());
        setPrevValue();
        setOperator();
        break;
      case ".":
        if (curValue.toString().includes(".")) {
          setCurValue(curValue);
        } else {
          setCurValue(curValue + ".");
        }
        break;
      case "+":
        updatePrevValue(operator);
        setCurValue("0");
        setOperator("+");
        break;
      case "-":
        updatePrevValue(operator);
        setCurValue("0");
        setOperator("-");
        break;
      case "x":
        updatePrevValue(operator);
        setCurValue("0");
        setOperator("x");
        break;
      case "/":
        updatePrevValue(operator);
        setCurValue("0");
        setOperator("/");
        break;
      case "=":
        updateResult(operator);
        setPrevValue(null);
        setOperator(null);
        break;
      case "<":
        if (curValue === "") {
          setCurValue("0");
        } else {
          setCurValue(curValue.toString().slice(0, -1));
        }
        break;
      default:
        break;
    }
  };

  const formatValue = (value) => {
    return Number(value) > 999999999 ? Number(value).toExponential(3) : value;
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.screen}>
          <p>{formatValue(prevValue)}</p>
          <p>{formatValue(curValue)}</p>
        </div>
        <div className={styles.buttons}>
          {KEYBOARDS.map((item) => {
            const isHightLighted = pressedOperator === item.value;

            return (
              <Button
                key={item.id}
                type={item.type}
                onClick={() => {
                  handleButtonPress(item.value);
                  if (item.type === "calculator") {
                    setPressedOperator(item.value);
                  }
                }}
                ishightlighted={isHightLighted.toString()}
              >
                {item.value}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
