"use client"

import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface RadialProgressChartProps {
  percentage: number
  size: number
  strokeWidth: number
}

const RadialProgressChart: React.FC<RadialProgressChartProps> = ({ percentage, size, strokeWidth }) => {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const svg = d3.select(ref.current)
    const radius = size / 2
    const circumference = radius * 2 * Math.PI

    svg.attr('width', size).attr('height', size)

    const background = svg.append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', radius - strokeWidth / 2)
      .style('fill', 'none')
      .style('stroke', '#e6e6e6')
      .style('stroke-width', strokeWidth)

    const foreground = svg.append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', radius - strokeWidth / 2)
      .style('fill', 'none')
      .style('stroke', '#4CAF50')
      .style('stroke-width', strokeWidth)
      .style('stroke-dasharray', circumference)
      .style('stroke-dashoffset', circumference)

    const text = svg.append('text')
      .attr('x', radius)
      .attr('y', radius)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .style('font-size', '2rem')
      .style('font-weight', 'bold')

    foreground.transition()
      .duration(2000)
      .ease(d3.easeQuadOut)
      .style('stroke-dashoffset', circumference - (percentage / 100) * circumference)

    let count = 0
    const counter = setInterval(() => {
      count++
      text.text(`${Math.min(count, Math.round(percentage))}%`)
      if (count === Math.round(percentage)) clearInterval(counter)
    }, 20)

  }, [percentage, size, strokeWidth])

  return <svg ref={ref}></svg>
}

export default RadialProgressChart

