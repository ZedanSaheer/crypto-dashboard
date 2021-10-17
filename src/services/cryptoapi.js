import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query"

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '83c621a1c2msh2878da9c29c493fp1481fajsnbfea60512db0'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com/stats';

const createRequest = (url) => ({url , headers : cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoss : builder.query({
            query:()=> createRequest('/exchanges')
        })
    })
});
