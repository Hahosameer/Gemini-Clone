import React, { useContext, useState } from "react";
import "./sidebar.css";
import { Menu as MenuIcon, Add as AddIcon, Message as MessageIcon, Settings as SettingsIcon, Help as HelpIcon, Timeline as ActivityIcon } from '@mui/icons-material';
import { Context } from "../../context/Context";
function SideBar() {

    const [extended, setExtended] = useState(false);
    const {onSent,pretPrompt,setrecentPrompt,newChat} = useContext(Context)
     
    const loadPrompt = async (prompt) => {
        setrecentPrompt(prompt)
       await onSent(prompt)
    }


  return (
    <div className="sidebar">
      <div className="top">
        <MenuIcon className="menuicon" onClick={()=> setExtended(prev => !prev)} />

        <div onClick={()=>newChat()} className="newCHAT racent-entry">
          <AddIcon />
         {extended ? <p>New Chat</p>: null}
        </div>
        {extended ?
        <div className="recent">
            <p className="recent-title">Reacnt</p>
            {pretPrompt.map((item , index)=> {
             return(
                <div onClick={()=> loadPrompt(item)} className="racent-entry">
              <MessageIcon />
          <p>{item.slice(0,18)} ...</p>
            </div>
             )
            })}
            
        </div>
        : null}
      </div>
      <div className="bottom">
        <div className="bottom-item racent-entry">
         <HelpIcon />
         {extended ?<p>Help</p>:null}
        </div>
        <div className="bottom-item racent-entry">
         <ActivityIcon />
         {extended ? <p>Activity</p>:null}
        </div>
        <div className="bottom-item racent-entry">
         <SettingsIcon />
         {extended ?<p>Setting</p>:null}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
