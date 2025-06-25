
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from '@reduxjs/toolkit/query/react';



const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://virtualback.onrender.com/api'

const API_URLS = {

   //User related URL
   REGISTER: `${BASE_URL}/auth/register`,
   LOGIN: `${BASE_URL}/auth/login`,
   VERIFY_EMAIL: (token: string) => `${BASE_URL}/auth/verify-email/${token}`,
   FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
   RESET_PASSWORD: (token: string) => `${BASE_URL}/auth/reset-password/${token}`,
   VERIFY_AUTH: `${BASE_URL}/auth/verify-auth`,
   LOGOUT: `${BASE_URL}/auth/logout`,
   UPDATE_USER_PROFILE: `${BASE_URL}/user/profile/update`,
   UPDATE_USER_PASSWORD: `${BASE_URL}/user/profile/update-password`,


   //IMAGE related URL
   IMAGE: `${BASE_URL}/image`,
   GET_IMAGE: ({ page, limit }: { page: number; limit: number }) => `${BASE_URL}/image/${page}/${limit}`,
   GET_IMAGE_BY_USER_ID: (userId: string) => `${BASE_URL}/image/${userId}`,
   DELETE_IMAGE_BY_ID: (id: string) => `${BASE_URL}/image/${id}`,



   //Page related URL
   PAGE: `${BASE_URL}/page`,
   GET_PAGES: ({ page, limit }: { page: number; limit: number }) => `${BASE_URL}/page/${page}/${limit}`,
   GET_PAGE_BY_SLUG: (slug: string) => `${BASE_URL}/page/${slug}`,
   DELETE_PAGES_BY_ID: (id: string) => `${BASE_URL}/page/${id}`,

   //Blog related URL
   BLOG: `${BASE_URL}/blog`,
   GET_BLOGS: ({ page, limit }: { page: number; limit: number }) => `${BASE_URL}/blog/${page}/${limit}`,
   GET_BLOG_BY_SLUG: (slug: string) => `${BASE_URL}/blog/${slug}`,
   DELETE_BLOG_BY_ID: (id: string) => `${BASE_URL}/blog/${id}`,

   //Category related URL CATEGORY
   CATEGORY: `${BASE_URL}/category`,
   GET_CATEGORYS: ({ page, limit }: { page: number; limit: number }) => `${BASE_URL}/category/${page}/${limit}`,
   GET_CATEGORY_BY_SLUG: (slug: string) => `${BASE_URL}/category/${slug}`,
   DELETE_CATEGORY_BY_ID: (id: string) => `${BASE_URL}/category/${id}`,

   //Blog related URL
   FAQ: `${BASE_URL}/faq`,
   GET_FAQS: ({ page, limit }: { page: number; limit: number }) => `${BASE_URL}/faq/${page}/${limit}`,
   GET_FAQ_BY_ID: (id: string) => `${BASE_URL}/faq/${id}`,
   DELETE_FAQ_BY_ID: (id: string) => `${BASE_URL}/faq/${id}`,

   //Category related URL CATEGORY
   FAQCATEGORY: `${BASE_URL}/faqcategory`,
   GET_FAQCATEGORYS: ({ page, limit }: { page: number; limit: number }) => `${BASE_URL}/faqcategory/${page}/${limit}`,
   GET_FAQCATEGORY_BY_SLUG: (slug: string) => `${BASE_URL}/faqcategory/${slug}`,
   DELETE_FAQCATEGORY_BY_ID: (id: string) => `${BASE_URL}/faqcategory/${id}`,

   //Navigation related URL CATEGORY
   MENU: `${BASE_URL}/navigation/menu`,
   GET_MENU: ({ page, limit }: { page: number; limit: number }) => `${BASE_URL}/navigation/menu/${page}/${limit}`,
   DELETE_MENU_BY_ID: (menuId: string) => `${BASE_URL}/navigation/menu/${menuId}`,
   ITEM: `${BASE_URL}/navigation/item`,
   DELETE_ITEM_BY_ID: (itemId: string) => `${BASE_URL}/navigation/item/${itemId}`,
   ALLMENUITEM: `${BASE_URL}/navigation/menuwithitem`,

   //Section related URL
   SECTION: `${BASE_URL}/section`,
   GET_SECTIONS_BY_PAGE_ID: (pageId: string) => `${BASE_URL}/section/${pageId}`,
   DELETE_SECTION_BY_ID: (sectionId: string) => `${BASE_URL}/section/${sectionId}`,


}


export const api = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers) => {
         const token = localStorage.getItem("accessToken");
         if (token) {
            headers.set("Authorization", `Bearer ${token}`);
         }
         return headers;
      }

   }),
   tagTypes: ['user', 'Address', 'Product', 'Image', 'Page', 'Section', 'Blog', 'Category', 'Faq', 'Faqcategory', 'Menu'],
   endpoints: (builder) => ({
      //User end pint
      register: builder.mutation({
         query: (userData) => ({
            url: API_URLS.REGISTER,
            method: "POST",
            body: userData
         })
      }),
      login: builder.mutation({
         query: (userData) => ({
            url: API_URLS.LOGIN,
            method: "POST",
            body: userData
         })
      }),
      updateUser: builder.mutation({
         query: (userData) => ({
            url: API_URLS.UPDATE_USER_PROFILE,
            method: "PUT",
            body: userData
         })
      }),
      updateUserPassword: builder.mutation({
         query: (userData) => ({
            url: API_URLS.UPDATE_USER_PASSWORD,
            method: "PUT",
            body: userData
         })
      }),
      forgotPassword: builder.mutation({
         query: (emial) => ({
            url: API_URLS.FORGOT_PASSWORD,
            method: "POST",
            body: emial
         })
      }),
      resetPassword: builder.mutation({
         query: ({ token, newPassword }) => ({
            url: API_URLS.RESET_PASSWORD(token),
            method: "POST",
            body: { newPassword: newPassword }
         })
      }),
      verifyEmail: builder.mutation({
         query: (token) => ({
            url: API_URLS.VERIFY_EMAIL(token),
            method: "GET"
         })
      }),
      verifyAuth: builder.mutation({
         query: () => ({
            url: API_URLS.VERIFY_AUTH,
            method: "GET"
         })
      }),
      logOut: builder.mutation({
         query: () => ({
            url: API_URLS.LOGOUT,
            method: "GET"
         })
      }),

      //Images Endpoint Query
      uploadImage: builder.mutation({
         query: (imageData) => ({
            url: API_URLS.IMAGE,
            method: "POST",
            body: imageData
         }),
         invalidatesTags: ["Image"]
      }),
      deleteImageById: builder.mutation({
         query: (imageId) => ({
            url: API_URLS.DELETE_IMAGE_BY_ID(imageId),
            method: "DELETE"
         }),
         invalidatesTags: ["Image"]
      }),
      getImages: builder.query({
         query: ({ page, limit }) => API_URLS.GET_IMAGE({ page, limit }),
         providesTags: ["Image"]
      }),
      getImageByUserId: builder.query({
         query: (userId) => API_URLS.GET_IMAGE_BY_USER_ID(userId),
         providesTags: ["Image"]
      }),


      //blogs Endpoint Query
      addUpadateBlog: builder.mutation({
         query: (blogData) => ({
            url: API_URLS.BLOG,
            method: "POST",
            body: blogData
         }),
         invalidatesTags: ["Blog"]
      }),
      deleteBlogById: builder.mutation({
         query: (blogId) => ({
            url: API_URLS.DELETE_BLOG_BY_ID(blogId),
            method: "DELETE"
         }),
         invalidatesTags: ["Blog"]
      }),
      getBlogs: builder.query({
         query: ({ page, limit }) => API_URLS.GET_BLOGS({ page, limit }),
         providesTags: ["Blog"]
      }),
      getBlogBySlug: builder.query({
         query: (slug) => API_URLS.GET_BLOG_BY_SLUG(slug),
         providesTags: ["Blog"]
      }),


      //Category Endpoint Query
      addUpadateCategory: builder.mutation({
         query: (categoryData) => ({
            url: API_URLS.CATEGORY,
            method: "POST",
            body: categoryData
         }),
         invalidatesTags: ["Category"]
      }),
      deleteCategoryById: builder.mutation({
         query: (categoryId) => ({
            url: API_URLS.DELETE_CATEGORY_BY_ID(categoryId),
            method: "DELETE"
         }),
         invalidatesTags: ["Category"]
      }),
      getCategorys: builder.query({
         query: ({ page, limit }) => API_URLS.GET_CATEGORYS({ page, limit }),
         providesTags: ["Category"]
      }),
      getCategoryBySlug: builder.query({
         query: (slug) => API_URLS.GET_CATEGORY_BY_SLUG(slug),
         providesTags: ["Category"]
      }),


      //Faq Endpoint Query
      addUpadatefaq: builder.mutation({
         query: (faqData) => ({
            url: API_URLS.FAQ,
            method: "POST",
            body: faqData
         }),
         invalidatesTags: ["Faq"]
      }),
      deleteFaqById: builder.mutation({
         query: (faqId) => ({
            url: API_URLS.DELETE_FAQ_BY_ID(faqId),
            method: "DELETE"
         }),
         invalidatesTags: ["Faq"]
      }),
      getFAQs: builder.query({
         query: ({ page, limit }) => API_URLS.GET_FAQS({ page, limit }),
         providesTags: ["Faq"]
      }),
      getFaqById: builder.query({
         query: (id) => API_URLS.GET_FAQ_BY_ID(id),
         providesTags: ["Faq"]
      }),


      //Faq Category Endpoint Query
      addUpadateFaqcategory: builder.mutation({
         query: (categoryData) => ({
            url: API_URLS.FAQCATEGORY,
            method: "POST",
            body: categoryData
         }),
         invalidatesTags: ["Faqcategory"]
      }),
      deleteFaqcategoryById: builder.mutation({
         query: (categoryId) => ({
            url: API_URLS.DELETE_FAQCATEGORY_BY_ID(categoryId),
            method: "DELETE"
         }),
         invalidatesTags: ["Faqcategory"]
      }),
      getFaqcategorys: builder.query({
         query: ({ page, limit }) => API_URLS.GET_FAQCATEGORYS({ page, limit }),
         providesTags: ["Faqcategory"]
      }),
      getFaqcategoryBySlug: builder.query({
         query: (slug) => API_URLS.GET_FAQCATEGORY_BY_SLUG(slug),
         providesTags: ["Faqcategory"]
      }),



      //Navigation Endpoint Query
      addUpadateMenu: builder.mutation({
         query: (menuData) => ({
            url: API_URLS.MENU,
            method: "POST",
            body: menuData
         }),
         invalidatesTags: ["Menu"]
      }),
      deleteMenuById: builder.mutation({
         query: (menuId) => ({
            url: API_URLS.DELETE_MENU_BY_ID(menuId),
            method: "DELETE"
         }),
         invalidatesTags: ["Menu"]
      }),
      getMenus: builder.query({
         query: ({ page, limit }) => API_URLS.GET_MENU({ page, limit }),
         providesTags: ["Menu"]
      }),
      addUpadateItem: builder.mutation({
         query: (itemData) => ({
            url: API_URLS.ITEM,
            method: "POST",
            body: itemData
         }),
         invalidatesTags: ["Menu"]
      }),
      deleteItemById: builder.mutation({
         query: (itemId) => ({
            url: API_URLS.DELETE_ITEM_BY_ID(itemId),
            method: "DELETE"
         }),
         invalidatesTags: ["Menu"]
      }),
      getAllMenusAndAllItems: builder.query({
         query: () => API_URLS.ALLMENUITEM,
         providesTags: ["Menu"]
      }),



      //Pages Endpoint Query
      addUpadatePage: builder.mutation({
         query: (pageData) => ({
            url: API_URLS.PAGE,
            method: "POST",
            body: pageData
         }),
         invalidatesTags: ["Page"]
      }),
      deletePageById: builder.mutation({
         query: (pageId) => ({
            url: API_URLS.DELETE_PAGES_BY_ID(pageId),
            method: "DELETE"
         }),
         invalidatesTags: ["Page"]
      }),
      getPages: builder.query({
         query: ({ page, limit }) => API_URLS.GET_PAGES({ page, limit }),
         providesTags: ["Page"]
      }),
      getPageBySlug: builder.query({
         query: (slug) => API_URLS.GET_PAGE_BY_SLUG(slug),
         providesTags: ["Page"]
      }),



      //Section Endpoint Query
      addUpadateSection: builder.mutation({
         query: (sectionData) => ({
            url: API_URLS.SECTION,
            method: "POST",
            body: sectionData
         }),
         invalidatesTags: ["Section"]
      }),
      deleteSectionById: builder.mutation({
         query: (sectionId) => ({
            url: API_URLS.DELETE_SECTION_BY_ID(sectionId),
            method: "DELETE"
         }),
         invalidatesTags: ["Section"]
      }),
      getSectionsByPageId: builder.query({
         query: ({ pageId }) => API_URLS.GET_SECTIONS_BY_PAGE_ID(pageId),
         providesTags: ["Section"]
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
   useUpdateUserPasswordMutation,
   useForgotPasswordMutation,

   useUploadImageMutation,
   useDeleteImageByIdMutation,
   useGetImageByUserIdQuery,
   useGetImagesQuery,

   useAddUpadateFaqcategoryMutation,
   useDeleteFaqcategoryByIdMutation,
   useGetFaqcategoryBySlugQuery,
   useGetFaqcategorysQuery,

   useAddUpadatefaqMutation,
   useDeleteFaqByIdMutation,
   useGetFaqByIdQuery,
   useGetFAQsQuery,

   useAddUpadateCategoryMutation,
   useDeleteCategoryByIdMutation,
   useGetCategoryBySlugQuery,
   useGetCategorysQuery,

   useAddUpadateBlogMutation,
   useDeleteBlogByIdMutation,
   useGetBlogBySlugQuery,
   useGetBlogsQuery,

   useAddUpadateMenuMutation,
   useDeleteMenuByIdMutation,
   useGetMenusQuery,
   useAddUpadateItemMutation,
   useDeleteItemByIdMutation,
   useGetAllMenusAndAllItemsQuery,

   useAddUpadatePageMutation,
   useDeletePageByIdMutation,
   useGetPageBySlugQuery,
   useGetPagesQuery,

   useAddUpadateSectionMutation,
   useDeleteSectionByIdMutation,
   useGetSectionsByPageIdQuery

} = api;