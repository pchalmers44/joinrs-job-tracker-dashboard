import { Link } from 'react-router-dom'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import JoinrsFunAnimation from '../components/JoinrsFunAnimation.jsx'

function countByStatus(jobs, status) {
  return jobs.filter((job) => job.status === status).length
}

const STATUS_COLORS = {
  Applied: '#fa4b19',
  Interview: '#0087f3',
  Offer: '#0fb491',
  Rejected: '#dc3545',
}

function buildStatusData(jobs) {
  const applied = countByStatus(jobs, 'Applied')
  const interview = countByStatus(jobs, 'Interview')
  const offer = countByStatus(jobs, 'Offer')
  const rejected = countByStatus(jobs, 'Rejected')

  return [
    { name: 'Applied', value: applied },
    { name: 'Interview', value: interview },
    { name: 'Offer', value: offer },
    { name: 'Rejected', value: rejected },
  ]
}

function formatTooltipValue(value, name, props) {
  const total = props?.payload?.total ?? 0
  const percent = total > 0 ? Math.round((value / total) * 100) : 0
  return [`${value} (${percent}%)`, name]
}

function renderPieLabel({ name, value, percent }) {
  if (!value) return ''
  return `${name}: ${Math.round(percent * 100)}%`
}

export default function Dashboard({ jobs }) {
  const totalApplications = jobs.length
  const interviews = countByStatus(jobs, 'Interview')
  const offers = countByStatus(jobs, 'Offer')
  const rejections = countByStatus(jobs, 'Rejected')
  const statusData = buildStatusData(jobs)
  const totalForChart = statusData.reduce((sum, item) => sum + item.value, 0)
  const statusDataWithTotal = statusData.map((item) => ({ ...item, total: totalForChart }))

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Dashboard</h1>
          <p className="pageSubtitle">Track applications and stay on top of outcomes.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <JoinrsFunAnimation size={58} />
          <Link to="/add-job" className="button buttonPrimary">
            Add job
          </Link>
        </div>
      </div>

      <section className="statsGrid" aria-label="Job stats">
        <div className="statCard">
          <div className="statLabel">Total applications</div>
          <div className="statValue">{totalApplications}</div>
        </div>
        <div className="statCard">
          <div className="statLabel">Interviews</div>
          <div className="statValue">{interviews}</div>
        </div>
        <div className="statCard">
          <div className="statLabel">Offers</div>
          <div className="statValue">{offers}</div>
        </div>
        <div className="statCard">
          <div className="statLabel">Rejections</div>
          <div className="statValue">{rejections}</div>
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h2 className="panelTitle">Applications by status</h2>
        </div>
        <div className="panelBody">
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusDataWithTotal}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  labelLine={false}
                  label={renderPieLabel}
                >
                  {statusDataWithTotal.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] ?? '#e0e0e0'}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="muted" style={{ marginTop: 10 }}>
            Tip: update statuses from the Applications page to keep this chart accurate.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h2 className="panelTitle">Next steps</h2>
        </div>
        <div className="panelBody">
          <div className="actionRow">
            <Link to="/applications" className="button">
              View applications
            </Link>
            <Link to="/add-job" className="button buttonPrimary">
              Add another
            </Link>
          </div>
          <p className="muted">
            Tip: update statuses from the Applications page to keep these stats accurate.
          </p>
        </div>
      </section>
    </div>
  )
}
