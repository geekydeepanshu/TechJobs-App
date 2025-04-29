import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getJobById } from "../../../../../server/controllers/job.controller";


export const jobApi = createApi({
    reducerPath: 'jobApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/jobs`
    }),
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => "/getAllJobs"
        }),
        addJob: builder.mutation({
            query: ({ job, token }) => ({
                url: "/postjob",
                method: "POST",
                body: job,  // TODO: add auth token in request
                headers: { Authorization: `Bearer ${token}` }
            })
        }),
        getJobById: builder.mutation({
            query: (jobId) => ({
                url: "/getjobbyid",
                method: "POST",
                body: jobId // change here
            })
        }),
        getAllJobsByRecruiter: builder.query({
            query: () => "/getalljobsbyrectruiter"
        }),
        updateJob: builder.mutation({
            query: (updatedJob) => ({
                url: `/update/${updatedJob._id}`,
                method: "PUT",
                body: updatedJob
            })
        }),
        deleteJob: builder.mutation({
            query: (jobId) => ({
                url: `/delete/${jobId}`,
                method: "DELETE"
            })
        })

    })
})

export const { useGetJobsQuery, useAddJobMutation } = jobApi;  