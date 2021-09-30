import { instance } from "./axios";

const getProducts = async () => {
    const response = await instance.get('/products');
    return response.data;
};

export { getProducts };
