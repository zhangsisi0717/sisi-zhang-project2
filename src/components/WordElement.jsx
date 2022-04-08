import React from "react";
import "./WordElement.css";

// export default function WordElement(props) {
//   if (props.wordInfo) {
//     let items = [];
//     for (let element in props.wordInfo) {
//       if (element[1] === "green") {
//         items.push(<a style="color: green">{element[0]}</a>);
//       } else if (element[1] === "yellow") {
//         items.push(<a style="color: yellow">{element[0]}</a>);
//       } else {
//         items.push(<a style="color: grey">{element[0]}</a>);
//       }
//     }
//     return <div>{items}</div>;
//   }
// }

export default function WordElement(props) {
  if (props.wordInfo) {
    let items = [];
    for (let element of props.wordInfo) {
      items.push(
        <a
          className="wordle-words"
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
