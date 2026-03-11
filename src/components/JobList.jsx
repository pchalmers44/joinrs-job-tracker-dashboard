import JobCard from './JobCard.jsx'

export default function JobList({ jobs, updateJob, deleteJob }) {
  if (jobs.length === 0) {
    return <p className="muted">No jobs yet. Add one to get started.</p>
  }

  return (
    <div className="jobList" role="list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} updateJob={updateJob} deleteJob={deleteJob} />
      ))}
    </div>
  )
}
