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
                console.log("context",userData);
                setUser(userData); // Set the user data in the context
            } else {
                setUser(null); // Clear user data if the token is not valid
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        }
    };

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
