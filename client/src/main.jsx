import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router';
import {ToastContainer} from 'react-toastify';
import './index.css';
import AppLayout from './AppLayout.jsx';
import {
  RecruiterLoginPage,
  RecruiterRegistrationPage,
  CandidateLoginPage,
  CandidateRegistrationPage,
  AddJobPage,
  ManageJobsPage,
  ViewApplicationPage,
  UploadCompanyLogoPage,
  JobDetailViewPage,
  JobEditPage
} from "./pages"
import AuthLayout from './AuthLayout.jsx';
import { store } from './store/store.js';
import {Provider} from 'react-redux';
import { toastOptions } from './utils/index.js';
import RecruiterLayout from './RecruiterLayout.jsx';
import {JobCard,JobListings, JobTitleBanner, SearchBanner, SearchBox} from './components';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<AppLayout/>}>
        </Route>
        <Route element={<AuthLayout/>}>
          <Route path="user-login" element={<CandidateLoginPage/>}/>
          <Route path="user-registration" element={<CandidateRegistrationPage/>}/>
          <Route path="recruiter-login" element={<RecruiterLoginPage/>}/>
          <Route path="recruiter-registration" element={<RecruiterRegistrationPage/>}/>
        </Route>
        <Route path='/view-job/:jobId' element={<JobDetailViewPage/>}/>
        <Route path="/recruiter-dashboard" element={<RecruiterLayout/>}>
          <Route index path='add-job' element={<AddJobPage/>}/>
          <Route path='manage-jobs' element={<ManageJobsPage/>}/>
          <Route path='edit-job/:jobId' element={<JobEditPage/>}/>
          <Route path='view-applications' element={<ViewApplicationPage/>}/>
          
        </Route>
        <Route path='test' element={<JobDetailViewPage/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
    <ToastContainer/>
  </StrictMode>,
)
