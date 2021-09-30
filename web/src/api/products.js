import { instance } from "./axios";

const getProducts = async (searchTerm) => {
    const response = await instance.get('/products', {
        params: {
            searchTerm
        }
    });
    return response.data;
};

export { getProducts };
