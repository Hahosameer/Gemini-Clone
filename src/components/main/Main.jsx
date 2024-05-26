import React, { useContext } from "react";
import "./main.css";
import Profile from "../../assets/1.jpeg";
import Gemini from "../../assets/gemini.png";
import {
  Message as MessageIcon,
  Explore as CompassIcon,
  Lightbulb as BulbIcon,
  Code as CodeIcon,
  ArrowUpward as ArrowUpwardIcon,
  Photo as GalleryIcon,
  Mic as MicIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import TemporaryDrawer from "../drawer/drawer.jsx";
import { Context } from "../../context/Context";

const Main = () => {
  const {
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
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>
          <TemporaryDrawer /> <span>Gemini</span>
        </p>
        <img src={Profile} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Sameer.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautifull place to see on an upcoming road trip</p>
                <CompassIcon className="cardicon" />
              </div>
              <div className="card">
                <p>Breifly summarize this concept urban planning</p>
                <BulbIcon className="cardicon" />
              </div>
              <div className="card">
                <p>Brainstorenrteam bonding activities for our work retteat</p>
                <MessageIcon className="cardicon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <CodeIcon className="cardicon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={Profile} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={Gemini} alt="" />
              {loading ? (
                <div className="loder">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <GalleryIcon className="searchicon" />
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter your message"
            />
            <div>
              <MicIcon className="searchicon" />
              {input ? (
                <ArrowUpwardIcon
                  className="searchicon"
                  onClick={() => onSent()}
                />
              ) : null}
            </div>
          </div>
          <p className="botton-info">
            Gemini can make mistakes. Check important info
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
