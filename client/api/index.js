import axios from 'axios';

const api = {
    apiKey: 'fe550af0cfdd5d31539a0d1971a7ff25',
    baseUrl: 'https://api.themoviedb.org/3'
};

const getData = (query) => {
    if (query.type === 'getPopular') {
        const url = `${api.baseUrl}/movie/popular?api_key=${api.apiKey}&language=en-US&page=${query.page || 1}`;
        return axios.get(url)
                .then((response) => {
                    console.log(response);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
    } else if (query.type === 'getSearch') {
        const url = `${api.baseUrl}/search/movie?api_key=${api.apiKey}&language=en-US&query=${query.input}`;
        return axios.get(url)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    } else if (query.type === 'getGenres') {
        const url = `${api.baseUrl}/genre/movie/list?api_key=${api.apiKey}&language=en-US`;
        return axios.get(url)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    } else if (query.type === 'getRecommendations') {
        const url = `${api.baseUrl}/movie/${query.id}/recommendations?api_key=${api.apiKey}&language=en-US`;
        return axios.get(url)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    } else if (query.type === 'getFilmData') {
        const url = `${api.baseUrl}/movie/${query.id}?api_key=${api.apiKey}&language=en-US`;
        return axios.get(url)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return null;
};

export default getData;
