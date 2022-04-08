import React from "react";

export default function WordElement(props) {
  if (props.wordInfo) {
    let items = [];
    for (let [index, element] of props.wordInfo.entries()) {
      items.push(
        <a
          className="wordle-words"
          key={index}
          style={{
            fontSize: 25,
            fontFamily: "courier",
            backgroundColor: `${element[1]}`,
          }}
        >
          {element[0]}
        </a>
      );
    }
    return <div style={{ margin: 10 }}>{items}</div>;
  }
}
