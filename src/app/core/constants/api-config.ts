/**
 * Centralized API configuration.
 * Change apiBaseUrl here once real backend is ready — no other file needs to change.
 */
export const API_CONFIG = {
  apiBaseUrl: 'https://api.electrostore.example.com/api',
  useMockData: true, // flip to false once backend endpoints are live
  endpoints: {
    products: 'Product/GetProductList',
    productCreate: 'Product/CreateProduct',
    productUpdate: 'Product/UpdateProduct',
    productDelete: 'Product/DeleteProduct',
    categories: 'Category/GetCategoryList',
    orders: 'Order/GetOrderList',
    orderCreate: 'Order/CreateOrder',
    offers: 'Offer/GetActiveOffers',
    dashboardSummary: 'Dashboard/GetSummary'
  }
};
