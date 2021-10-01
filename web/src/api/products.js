import { instance } from "./axios";

const getProducts = async (searchTerm) => {
    const response = await instance.get('/products', {
        params: {
            searchTerm
        }
    });
    return response.data;
};

const getFilters = async () => {
    const response = await instance.get('/products/filters');
    return response.data;
};

export { getProducts, getFilters };
