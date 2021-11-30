import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const marginDefault = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
}

const colorDefault = [
  '#37879A',
  '#52BBF4',
  '#74D2BE',
  '#FF99FD',
  '#BB55DD'
]

export default function D3BarChart({
  data,
  margin = marginDefault,
  color = colorDefault
}) {
  const svgRef = useRef(null)

  const svgWidth = 300
  const svgHeight = 300
  const width = svgWidth - margin.left - margin.right
  const height = svgHeight - margin.top - margin.bottom

  useEffect(() => {
    svgRef.current.innerHTML = ''

    const values = data.map(data => data.value)
    const labels = data.map(data => data.label)

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(values)])
      .range([0, height])

    const yAxisScale = d3.scaleLinear()
      .domain([0, d3.max(values)])
      .range([height, 0])

    const yAxisTicks = d3.axisLeft(yAxisScale)
      .ticks(5)

    const xScale = d3.scaleBand()
      .domain(labels)
      .range([0, width])
      .padding(0.1)

    const xAxisTicks = d3.axisBottom(xScale)
      .ticks(data.length)

    const colorScale = d3.scaleLinear()
      .domain(color.map((c, i) => {
        const fract = 1 / (color.length - 1)
        return data.length * (fract * i)
      }))
      .range(color)

    const svg = d3.select(svgRef.current)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const yAxis = svg.append('g')
      .classed('y-axis', true)
      .call(yAxisTicks)
      .call(g => g.selectAll('line').clone()
        .attr('x2', width)
        .attr('stroke-opacity', 0.1)
      )

    const xAxis = svg.append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0, ${height})`)
      .call(xAxisTicks)
      .selectAll('text')
        .attr('transform', 'translate(-10, 0) rotate(-45)')
        .style('text-anchor', 'end')

    const bars = svg.append('g')
      .classed('bars', true)
      .selectAll('rect')
      .data(data)

    bars.enter().append('rect')
      .attr('width', d => {
        return xScale.bandwidth()
      })
      .attr('x', (d, i) => {
        return xScale(d.label)
      })
      .attr('fill', (d, i) => {
        return colorScale(i)
      })
      .attr('height', 0)
      .attr('y', height)
      .transition()
      .delay((d, i) => {
        return i * 100
      })
      .attr('height', d => {
        return yScale(d.value)
      })
      .attr('y', d => {
        return height - yScale(d.value)
      })
  }, [data])
  return (
    <svg
      ref={ svgRef }
      viewBox={ `0 0 ${svgWidth} ${svgHeight}` }
      style={ {
        font: '12px sans-serif',
        display: 'block',
        margin: '0 auto',
        maxWidth: '400px'
      } }
    />
  )
}
