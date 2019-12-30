import React from "react";
import MovieForm from "../MovieForm/MovieForm";
import MovieTable from "../MovieTable/MovieTable";

function MoviePage(){
  return(
    <div>
      <MovieForm />
      <MovieTable />
    </div>
  );
}

export default MoviePage;