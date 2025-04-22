import axios from 'axios';

const VENDOR_API_URL = 'http://localhost:5001/products';

class Vendor {
  async getAllProducts() {
    const response = await axios.get(VENDOR_API_URL);
    return response.data;
  }

  async addProduct(product) {
    const response = await axios.post(VENDOR_API_URL, product);
    return response.data;
  }

  async updateProduct(product) {
    const response = await axios.put(`${VENDOR_API_URL}/${product.id}`, product);
    return response.data;
  }

  async deleteProduct(productId) {
    const response = await axios.delete(`${VENDOR_API_URL}/${productId}`);
    return response.data;
  }

  async getProductById(productId) {
    const response = await axios.get(`${VENDOR_API_URL}/${productId}`);
    return response.data;
  }
}

const VendorService = new Vendor();
export default VendorService;
