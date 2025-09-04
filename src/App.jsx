import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <BrowserRouter>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/candidate/register" element={<CandidateRegisterPage />} />
          <Route path="/hr/register" element={<HrRegisterPage />} />
          <Route path="/vacancies" element={<VacancyListPage />} />
          <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
          <Route path="/interview/:id" element={<InterviewPage />} />
          <Route path="/hr/vacancies" element={<HrDashboardPage />} />
          <Route path="/hr/vacancies/new" element={<CreateVacancyPage />} />
          <Route path="/hr/vacancies/:id/edit" element={<EditVacancyPage />} />
          <Route path="/hr/vacancies/:id/candidates" element={<CandidateFunnelPage />} />
          <Route path="/hr/candidates/:id/report" element={<CandidateReportPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;