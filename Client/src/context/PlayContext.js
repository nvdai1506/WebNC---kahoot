import React, { useState, useEffect } from "react";

const PlayContext = React.createContext({
  isValidation: false,
  isLoggedIn: false,
  isPlaying: false,
  answer: "",
  answerScore: 0,
  username: "",
  score: 0,
  questionNumber: 0,
  totalQuestion: 10,
  questionTime: 0,
  questionType: 1,
  onLogin: () => {},
  onValidation: () => {},
  onAnswerScore: () => {},
  onUsername: () => {},
  onScore: () => {},
  onQuestion: () => {},
  onAnswerQuestion: () => {},
  url: "",
});

// export const PlayContextProvider = (props) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     if (localStorage.getItem("isLoggedIn") === "1") {
//       setIsLoggedIn(true);
//       // localStorage.setItem("isLoggedIn", "1");
//       // setIsLoggedIn(true);
//       // localStorage.removeItem('isLoggedIn');
//     }
//   }, []);

//   const loginHandler = (username) => {
//     localStorage.setItem("isLoggedIn", "1");
//     setIsLoggedIn(true);
//     setUsername(username);
//   };

//   return (
//     <PlayContext.Provider
//       value={{
//         isLoggedIn: false,
//         username: username,
//         score: score,
//         onLogin: loginHandler,
//       }}
//     >
//       {props.children}
//     </PlayContext.Provider>
//   );
// };

export default PlayContext;
