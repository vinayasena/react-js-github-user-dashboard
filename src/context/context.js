import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
// provider, consumer ( useContext)

const GithubProvider = ({ children }) => {
    /** add all the functionality and add to context values object */
    const [githubUser, setGithubUser] = useState(mockUser); 
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers) 
    //const [] = useState() 


  return (
    <GithubContext.Provider value={
        {
            githubUser,
            repos,
            followers

        }
    }>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
