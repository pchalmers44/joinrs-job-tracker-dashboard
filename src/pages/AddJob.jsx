import { useNavigate } from 'react-router-dom'
import JobForm from '../components/JobForm.jsx'

export default function AddJob({ addJob }) {
  const navigate = useNavigate()

  const handleSubmit = (jobValues) => {
    addJob(jobValues)
    navigate('/applications')
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Add Job</h1>
          <p className="pageSubtitle">Add a new application to your tracker.</p>
        </div>
      </div>

      <section className="panel">
        <div className="panelBody">
          <JobForm submitLabel="Add job" onSubmit={handleSubmit} />
        </div>
      </section>
    </div>
  )
}
