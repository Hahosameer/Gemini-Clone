// Context.jsx
import React, { createContext, useState } from "react";
import { run } from '../config/gemini.js'; // Correctly import the run function

export const Context = createContext();

const ContextProvider = (props) => {

const [input, setInput] = useState("");
const [recentPrompt , setrecentPrompt] = useState("");
const [pretPrompt , setPrePrompt] = useState([]);
const [showResult, setShowResult] = useState(false);
const [loading, setLoading] = useState(false);
const [resultData, setResultData] = useState("");


const delayPara = (index , nextWord) => {
  setTimeout(function(){
  setResultData(prev=> prev+nextWord)
  }, 75*index)
}

const newChat = ()=> {
    setLoading(false)
    setShowResult(false)
}




  const onSent = async (prompt) => {
   setResultData("")
   setLoading(true)
   setShowResult(true)
   let response;
   if(prompt !== undefined){
   response = await run(prompt)
   setrecentPrompt(prompt)

   }else{
    setPrePrompt(prev=>[...prev,input])
    setrecentPrompt(input)
    response = await run(input)

   }


    let responseArray = response.split("**")
    let newResponse="";
    for(let i = 0; i < responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1){
              newResponse += responseArray[i]
            }else{
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
    for(let i = 0; i < newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i]
            delayPara(i , nextWord+" ")
        }
        
    setLoading(false)
    setInput("")
    // console.log(input , "input data");
  };



  const contextValue = {
    onSent,
    pretPrompt,
    setPrePrompt,
    setrecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
