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
  loadProducts: (category) => api.get('products?category=' + category),
  deleteProduct: (id) => api.delete('products/' + id),
  createProduct: (product) => api.post('products', product),
  editProduct: (product) => api.put('products/' + product.id, product),
  readProduct: (id) => api.get('products/' + id)
}

export default apis