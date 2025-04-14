import axios from 'axios';

const FETCH_DATA = {
    method: 'get',
    url: 'https://api.unsplash.com/search/photos',
    params: {
        lang: 'uk',
        page: '0',
        per_page: '15',
    },
    headers: {
        Authorization: `Client-ID ${'qpoEzgTyRGGFbT-b-zLDTmaLZEtoNSeRUFr4ar22KGU'}`,
    },
};

export const fetchData = async (query, page = 1) => {
    const data = {
        ...FETCH_DATA,
        params: { ...FETCH_DATA.params, query, page },
    };
    const answer = await axios(data);

    return answer.data;
};

//     setQuery(prev => ({
//         ...prev,
//         params: { ...prev.params, query: input, page: newPage },
//     }));
// };
