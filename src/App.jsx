import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CandidateRegisterPage from './pages/CandidateRegisterPage';
import HrRegisterPage from './pages/HrRegisterPage';
import VacancyListPage from './pages/VacancyListPage';
import VacancyDetailPage from './pages/VacancyDetailPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import InterviewPage from './pages/InterviewPage';
import HrDashboardPage from './pages/HrDashboardPage';
import CreateVacancyPage from './pages/CreateVacancyPage';
import EditVacancyPage from './pages/EditVacancyPage';
import CandidateFunnelPage from './pages/CandidateFunnelPage';
import CandidateReportPage from './pages/CandidateReportPage';
import MyFeedbackPage from "./pages/MyFeedbackPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false}/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/candidate/register" element={<CandidateRegisterPage/>}/>
                <Route path="/hr/register" element={<HrRegisterPage/>}/>

                <Route element={<MainLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/vacancies" element={<VacancyListPage/>}/>
                    <Route path="/vacancies/:id" element={<VacancyDetailPage/>}/>

                    <Route
                        path="/my-applications"
                        element={
                            <ProtectedRoute allowedRoles={['CANDIDATE']}>
                                <MyApplicationsPage/>
                            </ProtectedRoute>
                        }
                    />


                    <Route
                        path="/hr/vacancies"
                        element={
                            <ProtectedRoute allowedRoles={['HR']}>
                                <HrDashboardPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hr/vacancies/new"
                        element={
                            <ProtectedRoute allowedRoles={['HR']}>
                                <CreateVacancyPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hr/vacancies/:id/edit"
                        element={
                            <ProtectedRoute allowedRoles={['HR']}>
                                <EditVacancyPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hr/vacancies/:id/candidates"
                        element={
                            <ProtectedRoute allowedRoles={['HR']}>
                                <CandidateFunnelPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hr/applications/:applicationId/report"
                        element={
                            <ProtectedRoute allowedRoles={['HR']}>
                                <CandidateReportPage/>
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route
                    path="/interview/:id"
                    element={
                        <ProtectedRoute allowedRoles={['CANDIDATE']}>
                            <InterviewPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-feedback/:applicationId"
                    element={
                        <ProtectedRoute allowedRoles={['CANDIDATE']}>
                            <MyFeedbackPage/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;