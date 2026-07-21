import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../services/authService";


const AuthContext = createContext();


// =====================================
// Auth Provider
// =====================================

export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(null);


  const [loading, setLoading] = useState(true);




  // ============================
  // Load Current User
  // ============================

  const loadUser = async () => {

    try {


      const token =
        localStorage.getItem("token");



      // No token available

      if (!token) {


        const storedUser =
          localStorage.getItem("user");


        if (storedUser) {


          setUser(
            JSON.parse(storedUser)
          );


        }


        return;


      }




      const data =
        await getProfile();




      if (data.success) {


        setUser(
          data.user
        );


        localStorage.setItem(

          "user",

          JSON.stringify(data.user)

        );


      }



    }

    catch(error) {


      console.error(
        "User refresh failed:",
        error
      );



      localStorage.removeItem("token");

      localStorage.removeItem("user");


      setUser(null);



    }

    finally {


      setLoading(false);


    }


  };





  // ============================
  // Login
  // ============================

  const login = (
    userData,
    token
  ) => {


    localStorage.setItem(
      "token",
      token
    );


    localStorage.setItem(

      "user",

      JSON.stringify(userData)

    );


    setUser(userData);


  };





  // ============================
  // Logout
  // ============================

  const logout = () => {


    localStorage.removeItem(
      "token"
    );


    localStorage.removeItem(
      "user"
    );


    setUser(null);


  };





  // ============================
  // Update User
  // Used After Payment
  // ============================

  const updateUser = (userData) => {


    setUser(
      userData
    );


    localStorage.setItem(

      "user",

      JSON.stringify(userData)

    );


  };





  // ============================
  // Refresh User From Backend
  // ============================

  const refreshUser = async () => {


    try {


      const data =
        await getProfile();



      if(data.success){


        setUser(
          data.user
        );


        localStorage.setItem(

          "user",

          JSON.stringify(data.user)

        );


      }



    }

    catch(error){


      console.error(
        "Refresh user failed:",
        error
      );


    }


  };





  // ============================
  // Load User On App Start
  // ============================

  useEffect(() => {


    loadUser();


  }, []);





  // ============================
  // Context Provider
  // ============================

  return (

    <AuthContext.Provider

      value={{

        user,

        loading,


        login,

        logout,


        refreshUser,


        updateUser,


      }}

    >

      {children}

    </AuthContext.Provider>

  );


};





// ============================
// Custom Hook
// ============================

export const useAuth = () =>

  useContext(AuthContext);