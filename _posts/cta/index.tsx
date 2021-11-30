import { useEffect } from 'react'

const colors = [
  {
    name: 'Red',
    slug: 'red',
    hex: '#c60c30'
  },
  {
    name: 'Orange',
    slug: 'orange',
    hex: '#f9461c'
  },
  {
    name: 'Yellow',
    slug: 'yellow',
    hex: '#f9e300'
  },
  {
    name: 'Green',
    slug: 'green',
    hex: '#009b3a'
  },
  {
    name: 'Blue',
    slug: 'blue',
    hex: '#00a1de'
  },
  {
    name: 'Purple',
    slug: 'purple',
    hex: '#522398'
  },
  {
    name: 'Pink',
    slug: 'pink',
    hex: '#e27ea6'
  },
  {
    name: 'Brown',
    slug: 'brown',
    hex: '#62361b'
  }
]

const issues = [
  {
    name: 'Minor Delays',
    slug: 'minor_delays'
  },
  {
    name: 'Major Delays',
    slug: 'major_delays'
  },
  {
    name: 'Significant Delays',
    slug: 'significant_delays'
  },
  {
    name: 'Planned Work',
    slug: 'planned_work'
  },
  {
    name: 'Service Disruption',
    slug: 'service_disruption'
  }
]

export default function Post() {
  useEffect(() => {
    google.charts.load('current', { packages: ['bar', 'line'] })
    google.charts.setOnLoadCallback(drawChart)
  }, [])
  return (
    <>
      <h2>Which CTA Line Sucks Most?</h2>
      <p>We all know the Chicago Transit Authority and their ubiquitous elevated rail is imperfect, but in what discrete and quantifiable ways does this urban train line disappoint? Fortunately they tweet all of their failings, and it is through this lens that we attempt to answer the question "Which CTA Line Sucks Most?"</p>
      <p>The current winner (loser?) is... <b className="winner"></b></p>
      <h2>Issues by Line</h2>
      <div id="total-issues" className="chart" style="width: 100%; height: 500px;"></div>
      <h2>Issues by Type</h2>
      <div id="issues" className="chart" style="width: 100%; height: 500px;"></div>
      <h2>Issues over Time</h2>
      <div id="timeline" className="chart" style="width: 100%; height: 500px;"></div>
    </>
  )
}
