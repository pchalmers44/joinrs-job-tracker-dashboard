import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'job-tracker.jobs.v1'

function safeParseJobs(value) {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `job_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export default function useJobs() {
  const initialJobs = useMemo(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? safeParseJobs(stored) : []
  }, [])

  const [jobs, setJobs] = useState(initialJobs)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  }, [jobs])

  const addJob = (jobInput) => {
    const jobToAdd = {
      id: generateId(),
      company: jobInput.company?.trim() ?? '',
      role: jobInput.role?.trim() ?? '',
      status: jobInput.status ?? 'Applied',
      dateApplied: jobInput.dateApplied ?? new Date().toISOString().slice(0, 10),
      notes: jobInput.notes?.trim() ?? '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setJobs((previousJobs) => [jobToAdd, ...previousJobs])
    return jobToAdd
  }

  const updateJob = (jobId, updates) => {
    setJobs((previousJobs) =>
      previousJobs.map((job) => {
        if (job.id !== jobId) return job
        return { ...job, ...updates, updatedAt: new Date().toISOString() }
      }),
    )
  }

  const deleteJob = (jobId) => {
    setJobs((previousJobs) => previousJobs.filter((job) => job.id !== jobId))
  }

  return { jobs, addJob, updateJob, deleteJob }
}
