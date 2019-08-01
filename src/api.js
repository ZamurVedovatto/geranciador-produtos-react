import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const apis = {
  // Category endpoints
  loadCategory: (id) => api.get('categories/' + id),
  loadCategories: () => api.get('categories'),
  deleteCategory: (id) => api.delete('categories/' + id),
  createCategory: (category) => api.post('categories', category),
  editCategory: (category) => api.put('categories/' + category.id, category),

  // Product endpoints
  createProduct: (product) => api.post('products', product),
  deleteProduct: (id) => api.delete('products/' + id),
  loadProducts: (category) => api.get('products?category=' + category)
}

export default apis