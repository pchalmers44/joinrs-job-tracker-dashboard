import { useMemo, useState } from 'react'

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected']

function normalizeInitialValues(initialValues) {
  const today = new Date().toISOString().slice(0, 10)
  return {
    company: initialValues?.company ?? '',
    role: initialValues?.role ?? '',
    status: initialValues?.status ?? 'Applied',
    dateApplied: initialValues?.dateApplied ?? today,
    notes: initialValues?.notes ?? '',
  }
}

export default function JobForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const startingValues = useMemo(
    () => normalizeInitialValues(initialValues),
    [initialValues],
  )

  const [company, setCompany] = useState(startingValues.company)
  const [role, setRole] = useState(startingValues.role)
  const [status, setStatus] = useState(startingValues.status)
  const [dateApplied, setDateApplied] = useState(startingValues.dateApplied)
  const [notes, setNotes] = useState(startingValues.notes)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')

    if (!company.trim() || !role.trim()) {
      setErrorMessage('Company and role are required.')
      return
    }

    onSubmit({
      company,
      role,
      status,
      dateApplied,
      notes,
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formGrid">
        <label className="fieldLabel">
          Company *
          <input
            className="input"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="e.g., Google"
            required
          />
        </label>

        <label className="fieldLabel">
          Role *
          <input
            className="input"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="e.g., Graduate Software Engineer"
            required
          />
        </label>

        <label className="fieldLabel">
          Status
          <select
            className="select"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="fieldLabel">
          Date applied
          <input
            className="input"
            type="date"
            value={dateApplied}
            onChange={(event) => setDateApplied(event.target.value)}
          />
        </label>

        <label className="fieldLabel fieldFull">
          Notes
          <textarea
            className="textarea"
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add links, contacts, interview rounds, reminders..."
          />
        </label>
      </div>

      {errorMessage ? <p className="formError">{errorMessage}</p> : null}

      <div className="formActions">
        {onCancel ? (
          <button type="button" className="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="button buttonPrimary">
          {submitLabel || 'Save'}
        </button>
      </div>
    </form>
  )
}
