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
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({ show: true, msg: "" });
  /** get limit*/
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequest(remaining);
        if (remaining === 0) {
          toggleError(true, "You have exceeded the request limit!");
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleError = (show, msg) => {
    setError({ show, msg });
  };

  /** getGH user */
  const searchGithubUser = async (user) => {
    toggleError(false, "");
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    console.log(`${rootUrl}/users/${user}`)
    if (response) {
      setGithubUser(response.data);
      const { followers_url, repos_url } = response.data;

      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`) 
       ])
      .then((results)=>{
            const status = 'fulfilled';
            const[repos,followers]  = results;

           if(repos.status === status){
               setRepos(repos.value.data)
           }
           if(followers.status === status){
            setFollowers(followers.value.data)
           }
      })
    } else {
      toggleError(true, `No user with the user name ${user}`);
    }
    checkRequest();
    setLoading(false);
  };

  /** get Repos */
  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
