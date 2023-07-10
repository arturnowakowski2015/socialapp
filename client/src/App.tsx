import { useNavigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RegisterPage from "./components/RegisterPage";
import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useUser } from "./hooks/useUser";

const App = () => {
  const [
    register,
    pageType,
    login,
    user,
    isLoggedIn,
    loginUser,
    onlineUser,
    token,
    setUserLogin,
    setUserData,
    handleSubmit,
    addFriend,
    setPageType,
  ] = useUser();
  const navigate = useNavigate();

   useEffect(() => {
    navigate("/login"); 
 
 

  }, []); // eslint-disable-line react-hooks/exhaustive-deps
 
  return (
    <div className="app">
      /{JSON.stringify(user)}/{" "}
      {isLoggedIn === 0 ? (
        <Routes>
          <Route 
            path="/login"
            element={
              <LoginPage
                loginn={login}
                setUserLogin={setUserLogin}
                loginUser={loginUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage
                user={user}
                setUserData={setUserData}
                register={register}
              />
            }
          />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route
              path="/home"
              element={
                <Home
                  user={user}
                  login={login}
                  addFriend={addFriend}
                  onlineUser={onlineUser}
                  token={token}
 
                />
              }
            />
            <Route path="/profile/:userId" element={<div>auth</div>} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
/*
Set-ExecutionPolicy Unrestricted
npm install 

 npm i express body-parser cors dotenv multer helmet morgan http bcrypt jsonwebtoken path -g nodemon

npm i react react-dom react   react-router-dom  --save-dev @types/react-dom   socket.io-client
*/