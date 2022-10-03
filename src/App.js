import Home from "./pages/Home";
import DetailFilm from "./pages/Users/DetailFilm";
import Addfilm from "./pages/Admin/AddFilm";
import DetailProfile from "./pages/Users/DetailProfile";
import TransactionList from "./pages/Admin/TransactionList";
import MyListFilm from "./pages/Users/UserListFilm";
import UserHome from "./pages/Users/UserHome";
import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./assets/userContext";
import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.log("ini state:", state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/transaction");
      } else if (state.user.role === "user") {
        navigate("/user");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("ini response:", response);

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
    console.log("user context", state);
  }, []);
  return (
    <>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="/detail-film/:id" element={<DetailFilm />} />
          <Route path="/add-film" element={<Addfilm />} />
          <Route path="/profile" element={<DetailProfile />} />
          <Route path="/transaction" element={<TransactionList />} />
          <Route path="/my-list-film" element={<MyListFilm />} />
          <Route path="/user" element={<UserHome />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
