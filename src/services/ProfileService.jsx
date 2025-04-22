import axios from 'axios';

const PROFILE_API_URL = 'http://localhost:5000';

class Profile {
  // Fetch user data
  async getUserData() {
    const response = await axios.get(`${PROFILE_API_URL}/user`);
    return response.data;
  }

  // Fetch orders data
  async getOrdersData() {
    const response = await axios.get(`${PROFILE_API_URL}/orders`);
    return response.data;
  }

  // Update an order
  async updateOrder(order) {
    const response = await axios.put(`${PROFILE_API_URL}/orders/${order.id}`, order);
    return response.data;
  }

  // Update user profile data
  async updateUserData(updatedUser) {
    const response = await axios.put(`${PROFILE_API_URL}/user`, updatedUser);
    return response.data;
  }
}

const ProfileService = new Profile();
export default ProfileService;
