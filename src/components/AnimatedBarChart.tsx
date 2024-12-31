"use client"

import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface DataItem {
  label: string
  value: number
}

interface AnimatedBarChartProps {
  data: DataItem[]
  width: number
  height: number
}

const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({ data, width, height }) => {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const svg = d3.select(ref.current)
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.1)

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([innerHeight, 0])

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))

    g.append('g')
      .call(d3.axisLeft(y))

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label) as number)
      .attr('y', innerHeight)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', '#4CAF50')
      .transition()
      .duration(1000)
      .attr('y', d => y(d.value))
      .attr('height', d => innerHeight - y(d.value))

  }, [data, width, height])

  return <svg ref={ref} width={width} height={height}></svg>
}

export default AnimatedBarChart

