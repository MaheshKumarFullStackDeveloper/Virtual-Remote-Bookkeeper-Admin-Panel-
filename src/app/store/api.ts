import { Address } from "@/lib/types/types";
import {  fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from '@reduxjs/toolkit/query/react';


const BASE_URL= process.env.NEXT_PUBLIC_API_URL || 'https://virtualback.onrender.com/api'

const API_URLS = {

    //User related URL
    REGISTER : `${BASE_URL}/auth/register`,
    LOGIN : `${BASE_URL}/auth/login`,
    VERIFY_EMAIL :(token:string)=> `${BASE_URL}/auth/verify-email/${token}`,
    FORGOT_PASSWORD :`${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD :(token:string)=> `${BASE_URL}/auth/reset-password/${token}`,
    VERIFY_AUTH :`${BASE_URL}/auth/verify-auth`,
    LOGOUT :`${BASE_URL}/auth/logout`,
    UPDATE_USER_PROFILE :`${BASE_URL}/user/profile/update`,


    //Product related URL
    PRODUCTS : `${BASE_URL}/product`,
    GET_PRODUCT_BY_ID :(id:string)=> `${BASE_URL}/product/${id}`,
    GET_PRODUCT_BY_SELLER_ID :(sellerId:string)=> `${BASE_URL}/product/${sellerId}`,
    DELETE_PRODUCT_BY_ID :(id:string)=> `${BASE_URL}/product/${id}`,

    
    //Address related URL
    GET_ADDRESSES : `${BASE_URL}/user/address`,
    ADD_OR_UPDATE_ADDRESS : `${BASE_URL}/user/address/create-or-update`,
}


export const api =createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        credentials:'include'
    }),
    tagTypes:['user','Address','Product'],
    endpoints:(builder)=>({
         //User end pint
         register:builder.mutation({
              query:(userData)=>({
                 url:API_URLS.REGISTER,
                 method:"POST",
                 body:userData
              })
         }),
         login:builder.mutation({
              query:(userData)=>({
                 url:API_URLS.LOGIN,
                 method:"POST",
                 body:userData
              })
         }),
         updateUser:builder.mutation({
              query:(userData)=>({
                 url:API_URLS.UPDATE_USER_PROFILE,
                 method:"PUT",
                 body:userData 
              })
         }),
         forgotPassword:builder.mutation({
              query:(emial)=>({
                 url:API_URLS.FORGOT_PASSWORD,
                 method:"POST",
                 body:emial
              })
         }),
         resetPassword:builder.mutation({
              query:({token,newPassword})=>({
                 url:API_URLS.RESET_PASSWORD(token),
                 method:"POST",
                 body:{newPassword:newPassword}
              })
         }),
         verifyEmail:builder.mutation({
              query:(token)=>({
                 url:API_URLS.VERIFY_EMAIL(token),
                 method:"GET"
              })
         }),
         verifyAuth:builder.mutation({
              query:()=>({
                 url:API_URLS.VERIFY_AUTH,
                 method:"GET"
              })
         }),
         logOut:builder.mutation({
              query:()=>({
                 url:API_URLS.LOGOUT,
                 method:"GET"
              })
         }),

         //Produuct Endpoint Query
         addProduct:builder.mutation({
            query:(productData)=>({
               url:API_URLS.PRODUCTS,
               method:"POST",
               body:productData
            }),
            invalidatesTags:["Product"]
         }),
         deleteProductById:builder.mutation({
            query:(productId)=>({
               url:API_URLS.DELETE_PRODUCT_BY_ID(productId),
               method:"DELETE"
            }),
            invalidatesTags:["Product"]
         }),
         getProducts:builder.query({
            query:()=>API_URLS.PRODUCTS,
            providesTags:["Product"]
         }),
         getProductById:builder.query({
            query:(id)=>API_URLS.GET_PRODUCT_BY_ID(id),
            providesTags:["Product"]
         }),
         getProductBySellerId:builder.query({
            query:(sellerId)=>API_URLS.GET_PRODUCT_BY_SELLER_ID(sellerId),
            providesTags:["Product"]
         }),


         //Address enpoint query
         getAddresses:builder.query<Address[], void>({
            query:()=>API_URLS.GET_ADDRESSES,
            providesTags:["Address"]
         }),
         addOrUpdateAddress:builder.mutation<Address, void>({
            query:(address)=>({
                url:API_URLS.ADD_OR_UPDATE_ADDRESS,
                method:"POST",
                body:address
             }),
             invalidatesTags:["Product"]
         }),
    })

})


export const {
   useRegisterMutation,
   useResetPasswordMutation,
   useVerifyAuthMutation,
   useVerifyEmailMutation,
   useLoginMutation,
   useLogOutMutation,
   useUpdateUserMutation,
   useForgotPasswordMutation,
   useAddProductMutation,
   useDeleteProductByIdMutation,
   useGetProductByIdQuery,
   useGetProductBySellerIdQuery,
   useGetProductsQuery,
   useGetAddressesQuery,
   useAddOrUpdateAddressMutation

}= api;