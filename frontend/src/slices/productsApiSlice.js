import { PRODUCTS_URL, UPLOADS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'], //iw we don't add then we will have to refesh the page again ang agani for 
      
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url : `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),  
    createProduct: builder.mutation({
      query: () => ({
        //we are not passing any data bcz we are making product from sample data and then we wil update it
        url: `${PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
      //it will stop from being cached so that we don't have to reload the page every often when we create a product
    }),  
     updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation,   useDeleteProductMutation, useCreateReviewMutation, useGetTopProductsQuery } = productsApiSlice;
