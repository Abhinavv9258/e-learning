// import { createContext, useEffect, useReducer } from "react";

// const INITIAL_STATE = {
//     user: JSON.parse(localStorage.getItem("user")) || null,
//     loading: false,
//     error: null,
// };

// export const AuthContext = createContext(INITIAL_STATE);

// const AuthReducer = (state, action) => {
//     switch (action.type) {
//         case "LOGIN_START":
//             return {
//                 user: null,
//                 loading: true,
//                 error: null,
//             };
//         case "LOGIN_SUCCESS":
//             return {
//                 user: action.payload,
//                 loading: false,
//                 error: null,
//             };
//         case "LOGIN_FAILURE":
//             return {
//                 user: null,
//                 loading: false,
//                 error: action.payload,
//             };
//         case "LOGOUT":
//             return {
//                 user: null,
//                 loading: false,
//                 error: null,
//             };
//         default:
//             return state;
//     }
// };

// export const AuthContextProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//     useEffect(() => {
//         localStorage.setItem("user", JSON.stringify(state.user));
//     }, [state.user]);

//     return (
//         <AuthContext.Provider
//             value={{
//                 user: state.user,
//                 loading: state.loading,
//                 error: state.error,
//                 dispatch,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// Create a UserContext.js file for managing user state
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if a token exists in local storage when the component mounts
        const token = localStorage.getItem("access_token");

        if (token) {
            // If a token exists, fetch user data using the token
            fetchUserData(token);
        }
    }, []);

    // Function to fetch user data based on the token
    const fetchUserData = async (token) => {
        try {
            // Send a request to the server to validate the token and fetch user data
            const response = await fetch("/api/users/checkauthentication", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData); // Set the user data in the context
            } else {
                setUser(null); // Clear user data if the token is not valid
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        }
    };

    // const login = async (credentials) => {
    //     // Implement your login logic here and set the user data if successful
    //     // Example:
    //     const response = await fetch("/api/auth/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(credentials),
    //     });
    //     if (response.ok) {
    //         const userData = await response.json();
    //         setUser(userData);
    //     } else {
    //         setUser(null);
    //     }
    // };

    // const logout = () => {
    //     // Implement your logout logic here, e.g., clear user data and remove token
    //     setUser(null);
    //     localStorage.removeItem("token");
    // };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an AuthProvider");
    }
    return context;
};
