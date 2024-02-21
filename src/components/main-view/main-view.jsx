import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      image:
        "https://cps-static.rovicorp.com/2/Open/Netflix/Program/48711315/_derived_jpg_q90_310x470_m0/All_Quiet_On_The_Western_Front_2x3_27_1666263522906_4.jpg",
      Title: "All Quiet on the Western Front",
      Description: "The story follows teenagers Paul Baumer and his friends Albert and Muller, who voluntarily enlist in the German army, riding a wave of patriotic fervor that quickly dissipates once they face the brutal realities of life on the front. Paul's preconceptions about the enemy and the rights and wrongs of the conflict soon crumble. However, amid the countdown to armistice, Paul must carry on fighting until the end, with no purpose other than to satisfy the top brass' desire to end the war on a German offensive.",
      Genre: "War",
      Director: "Edward Berger"
    },
    {
      id: 2,
      image:
      "https://www.movieposters.com/cdn/shop/files/scan_16fe9619-4324-433b-a1ae-acc0651122d2_480x.progressive.jpg?v=1696526753",
      Title: "Barbie",
      Description: "Barbie suffers a crisis that leads her to question her world and her existence.",
      Genre: "Comedy",
      Director: "Greta Gerwig"
    },
    {
      id: 3,
      image:
      "https://www.movieposters.com/cdn/shop/products/castleinthesky_480x.progressive.jpg?v=1620325724",
      Title: "The Castle in the Sky",
      Description: "A young boy and a girl with a magic crystal must race against pirates and foreign agents in a search for a legendary floating castle.",
      Genre: "Anime",
      Director: "Hayao Miyazaki"
    },
    {
      id: 4,
      image:
      "https://www.movieposters.com/cdn/shop/files/elemental_kotj1x5n_480x.progressive.jpg?v=1684520589",
      Title: "Elemental",
      Description: "Disney and Pixar's Elemental, an all-new, original feature film set in Element City, where fire-, water-, land- and air-residents live together. The story introduces Ember, a tough, quick-witted and fiery young woman, whose friendship with a fun, sappy, go-with-the-flow guy named Wade challenges her beliefs about the world they live in.",
      Genre: "Family",
      Director: "Peter Sohn"

    },
    {
      id: 5,
      image:
      "https://www.movieposters.com/cdn/shop/files/342587491_240405935310581_94618092866071562_n_480x.progressive.jpg?v=1685123459",
      Title: "Guardians of the Galaxy Vol.3",
      Description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe",
      Genre: "Sci-Fi",
      Director: "James Gunn"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
      ))}
    </div>
  );
}
