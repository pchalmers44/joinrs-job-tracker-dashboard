import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import JoinrsFunAnimation from '../components/JoinrsFunAnimation.jsx'
import JobList from '../components/JobList.jsx'

const STATUS_OPTIONS = ['All', 'Applied', 'Interview', 'Offer', 'Rejected']

export default function Applications({ jobs, updateJob, deleteJob }) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const visibleJobs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return jobs.filter((job) => {
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter
      if (!matchesStatus) return false

      if (!normalizedQuery) return true
      const companyValue = (job.company ?? '').toLowerCase()
      const roleValue = (job.role ?? '').toLowerCase()
      return companyValue.includes(normalizedQuery) || roleValue.includes(normalizedQuery)
    })
  }, [jobs, searchQuery, statusFilter])

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Applications</h1>
          <p className="pageSubtitle">Review and update your job pipeline.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <JoinrsFunAnimation size={54} tone="blue" />
          <Link to="/add-job" className="button buttonPrimary">
            Add job
          </Link>
        </div>
      </div>

      <section className="panel">
        <div className="panelHeader panelHeaderSplit">
          <h2 className="panelTitle">All jobs</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <label className="fieldLabel" style={{ minWidth: 220 }}>
              Search
              <input
                className="input"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Company or role..."
              />
            </label>

            <label className="fieldLabel">
              Status
              <select
                className="select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="panelBody">
          <JobList jobs={visibleJobs} updateJob={updateJob} deleteJob={deleteJob} />
        </div>
      </section>
    </div>
  )
}
