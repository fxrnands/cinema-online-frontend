import React from "react";
import NavbarUser from "../../components/Navbar/NavbarUser";
import Jumbotron from "../../components/Home/Jumbotron";
import ListMovies from "../../components/Home/ListMovies"

export default function Home() {
  return (
    <div>
      <NavbarUser />
      <Jumbotron />
      <ListMovies />
    </div>
  );
}
