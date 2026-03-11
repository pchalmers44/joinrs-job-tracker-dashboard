import { useMemo } from 'react'

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected']

function formatDate(dateValue) {
  if (!dateValue) return '—'
  try {
    return new Date(dateValue).toLocaleDateString()
  } catch {
    return dateValue
  }
}

export default function JobCard({ job, updateJob, deleteJob }) {
  const statusTone = useMemo(() => {
    switch (job.status) {
      case 'Interview':
        return 'badgeInfo'
      case 'Offer':
        return 'badgeSuccess'
      case 'Rejected':
        return 'badgeDanger'
      default:
        return 'badgeNeutral'
    }
  }, [job.status])

  const handleStatusChange = (event) => {
    updateJob(job.id, { status: event.target.value })
  }

  const handleDelete = () => {
    const ok = window.confirm(`Delete ${job.company} - ${job.role}?`)
    if (!ok) return
    deleteJob(job.id)
  }

  return (
    <article className="jobCard" role="listitem">
      <div className="jobCardHeader">
        <div className="jobCardTitle">
          <div className="jobCompany">{job.company || 'Untitled company'}</div>
          <div className="jobRole">{job.role || 'Untitled role'}</div>
        </div>

        <div className="jobCardMeta">
          <span className={`badge ${statusTone}`}>{job.status}</span>
        </div>
      </div>

      <div className="jobCardBody">
        <div className="jobDetails">
          <div className="detailItem">
            <div className="detailLabel">Date applied</div>
            <div className="detailValue">{formatDate(job.dateApplied)}</div>
          </div>

          <div className="detailItem">
            <div className="detailLabel">Status</div>
            <div className="detailValue">
              <select className="select" value={job.status} onChange={handleStatusChange}>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {job.notes ? <p className="jobNotes">{job.notes}</p> : null}
      </div>

      <div className="jobCardFooter">
        <button type="button" className="button buttonDanger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  )
}
