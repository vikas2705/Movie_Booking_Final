export const getTheatresForCurrentMovie = (
    allTheatres = [],
    currentMovieId = ""
) => {
    const filteredTheatres = allTheatres.filter(theatre => {
        const { movies = [] } = theatre;
        return movies.includes(currentMovieId);
    });

    return filteredTheatres;
};
