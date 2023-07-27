export const Actions = {
  LOGIN: 'LOGIN',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_PROFILE_PICTURE: 'UPDATE_PROFILE_PICTURE',
  FORM_SUBMITION_STATUS: 'FORM_SUBMITION_STATUS'
}

export const addProfile = (user) => { 
    return {
        type: Actions.ADD_USER, 
        payload: { user } 
    }
}

export const updateProfileImage = (image) => { 
    return {
        type: Actions.UPDATE_PROFILE_PICTURE, 
        payload: { image }
    }
}

export const updateProfile = (user) => { 
    return {
        type: Actions.UPDATE_USER, 
        payload: { user } 
    }
}

export const formSubmittionStatus = (status) => { 
    return {
        type: Actions.FORM_SUBMITION_STATUS, 
        payload: { status }
    }
}

export const login = (user) => { 
    return {
        type: Actions.LOGIN, 
        payload: { user }
    }
}


// export const registerUser = (user) => {
//   return (dispatch, getState) => {
//     // Fetch the current state
//     const { users } = getState();

//     // Check if the username already exists
//     if (users.users.some((u) => u.username === user.username)) {
//       alert("Username already exists!");
//     } else {
//       dispatch({
//         type: "REGISTER_USER",
//         payload: user,
//       });
//       alert("Registration successful!");
//     }
//   };
// };

// export const loginUser = (user) => {
//   return (dispatch, getState) => {
//     const { users } = getState();

//     // Check if the username and password match a registered user
//     const matchedUser = users.users.find(
//       (u) => u.username === user.username && u.password === user.password
//     );

//     if (matchedUser) {
//       dispatch({
//         type: "LOGIN_USER",
//       });
//       alert("Login successful!");
//     } else {
//       alert("Invalid credentials. Please try again.");
//     }
//   };
// };
