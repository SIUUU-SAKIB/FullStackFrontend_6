import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const parcelApi = createApi({
    reducerPath: 'parcel',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, credentials: 'include'
    }),
    endpoints: (builder) => ({
        getParcels: builder.query({
            query: (page) => `parcel/all-parcel?page=${page}&limit=4`,
        }),
        getAlParcels: builder.query({
            query: () => 'parcel/all-parcel',
        }),
        createParcel: builder.mutation({
            query: (parcel) => ({
                url: 'parcel/create-parcel',
                method: 'POST',
                body: parcel,
            }),
        }),
        getParcelByUser: builder.query({
            query: (userId) =>
                `parcel/getParcelByUser/${userId}`,
        }),

        getReceiverParcel: builder.query({
            query: (email) => ({
                url: `parcel/get-receiver-parcel/${email}`,
            })
        }),
        cancelParcel: builder.mutation({
            query: (trackingNumber) => ({
                url: `parcel/cancel-parcel`,
                method: 'DELETE',
                body: trackingNumber
            })
        }),
        approveParcel: builder.mutation({
            query: (payload) => ({
                url: "parcel/approve-parcel",
                method: 'PATCH',
                body: payload
            })
        }),
        deleteParcel: builder.mutation({
            query: (payload) => ({
                url: "parcel/delete-parcel",
                method: "DELETE",
                body: payload
            })
        })
    }),
});


export const { useGetParcelsQuery, useCreateParcelMutation, useGetParcelByUserQuery, useCancelParcelMutation, useGetReceiverParcelQuery, useApproveParcelMutation, useDeleteParcelMutation, useGetAlParcelsQuery } = parcelApi;
