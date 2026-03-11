import { NavLink, Route, Routes } from 'react-router-dom'
import './styles/app.css'
import AddJob from './pages/AddJob.jsx'
import Applications from './pages/Applications.jsx'
import Dashboard from './pages/Dashboard.jsx'
import joinrsLogo from './assets/joinrs logo.png'
import useJobs from './hooks/useJobs.js'

function getNavLinkClass(baseClass) {
  return ({ isActive }) => (isActive ? `${baseClass} active` : baseClass)
}

function Layout({ children }) {
  return (
    <div className="appShell">
      <header className="appHeader">
        <div className="headerInner">
          <div className="brand">
            <img className="brandLogo" src={joinrsLogo} alt="Joinrs" />
            <span className="brandName">Graduate Job Tracker</span>
          </div>

          <nav className="nav">
            <NavLink to="/" end className={getNavLinkClass('navLink')}>
              Dashboard
            </NavLink>
            <NavLink to="/applications" className={getNavLinkClass('navLink')}>
              Applications
            </NavLink>
            <NavLink
              to="/add-job"
              className={getNavLinkClass('navLink navLinkPrimary')}
            >
              Add Job
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="appMain">{children}</main>
    </div>
  )
}

export default function App() {
  const { jobs, addJob, deleteJob, updateJob } = useJobs()

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard jobs={jobs} />} />
        <Route
          path="/applications"
          element={
            <Applications jobs={jobs} updateJob={updateJob} deleteJob={deleteJob} />
          }
        />
        <Route path="/add-job" element={<AddJob addJob={addJob} />} />
      </Routes>
    </Layout>
  )
}
