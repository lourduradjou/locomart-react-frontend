import axios from 'axios'

const PRODUCT_API_URL = "http://localhost:3000/products";

class Product {
    async getAllProducts(){
        const response = await axios.get(`${PRODUCT_API_URL}`);
        return response.data;
    }

    async getProductById(id){
        const response = await axios.get(`${PRODUCT_API_URL}/${id}`);
        return response.data;
    }

}

const ProductService = new Product();
export default ProductService;