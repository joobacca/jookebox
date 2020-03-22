import React, { useState } from "react";

export const UserNameContext = React.createContext();

const UserNameProvider = ({ children }) => {
  const COOKIE_NAME = 'jookebox_username';

  const getCookie = () => {
    let cookieValue = '';
    const name = `${COOKIE_NAME}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie.length > 0) {
      const ca = decodedCookie.split(';');
      ca.forEach(c => {
        let cook = c;
        if (cook.length > 0) {
          while (cook.charAt(0) === ' ') {
            cook = cook.substring(1);
          }
          if (cook.indexOf(name) === 0) {
            cookieValue = cook.split('=')[1];
          }
        }
        return c;
      });
    }
    return cookieValue;
  };

  const [name, set] = useState(getCookie());

  const setCookie = consentValue => {
    const d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 1000); // 1h Zeit
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${COOKIE_NAME}=${consentValue};${expires};path=/`;
    set(consentValue);
  };

  React.useEffect(() => {
    const previouslySetName = getCookie();
    set(previouslySetName);
  }, []);

  return (
    <UserNameContext.Provider value={[name, setCookie]}>
      {children}
    </UserNameContext.Provider>
  );
};

export default UserNameProvider;
