import axios from 'axios'

const CART_API_URL = 'http://localhost:5000'

class CartService {
    // Fetch cart data
    async getCartData() {
        const response = await axios.get(`${CART_API_URL}/cart`)
        return response.data
    }

    // Update a cart item
    async updateCartItem(itemId, updatedItem) {
        const response = await axios.put(`${CART_API_URL}/cart/${itemId}`, updatedItem)
        return response.data
    }

    // Remove an item from the cart
    async removeCartItem(itemId) {
        const response = await axios.delete(`${CART_API_URL}/cart/${itemId}`)
        return response.data
    }

    // Add a new item to the cart
    async addToCart(newItem) {
        const response = await axios.post(`${CART_API_URL}/cart`, newItem)
        return response.data
    }
}

const cartService = new CartService()
export default cartService
