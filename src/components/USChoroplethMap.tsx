"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { useRouter } from 'next/navigation'

type MedicaidData = {
  [key: string]: number
}

const USChoroplethMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [medicaidData, setMedicaidData] = useState<MedicaidData | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/medicaid-data')
        .then(response => response.json())
        .then(data => setMedicaidData(data))
  }, [])

  useEffect(() => {
    if (!svgRef.current || !medicaidData) return

    const svg = d3.select(svgRef.current)
    const width = 960
    const height = 600

    svg.attr('width', width).attr('height', height)

    const projection = d3.geoAlbersUsa().scale(1300).translate([width / 2, height / 2])
    const path = d3.geoPath().projection(projection)

    const colorScale = d3.scaleOrdinal<number, string>()
        .domain([0, 1, 2])
        .range(['#f72b50', '#4ecdc4', '#fdcb6e'])

    // Function to convert state name to two-letter code
    const stateNameToCode = (name: string): string => {
      const stateMap: { [key: string]: string } = {
        "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
        "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
        "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
        "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
        "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO",
        "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
        "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH",
        "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
        "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
        "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
      }
      return stateMap[name] || name
    }

    // Fetch the US states GeoJSON data
    d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then((us: any) => {
      const states = feature(us, us.objects.states).features

      svg.selectAll('path')
          .data(states)
          .enter()
          .append('path')
          .attr('d', path as any)
          .attr('fill', (d: any) => {
            const stateCode = stateNameToCode(d.properties.name)
            return colorScale(medicaidData[stateCode] || 0)
          })
          .attr('stroke', '#4a5568')
          .attr('stroke-width', 0.5)
          .style('cursor', 'pointer')
          .on('mouseover', function(event, d: any) {
            d3.select(this).attr('stroke', '#000').attr('stroke-width', 1.5)
            const stateCode = stateNameToCode(d.properties.name)
            const value = medicaidData[stateCode]
            let status = "Unknown"
            if (value === 0) status = "Not adopted"
            else if (value === 1) status = "Adopted"
            else if (value === 2) status = "Adopted but not implemented"
            d3.select('#tooltip')
                .style('display', 'block')
                .html(`${d.properties.name}: ${status}`)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 28}px`)
          })
          .on('mouseout', function() {
            d3.select(this).attr('stroke', '#4a5568').attr('stroke-width', 0.5)
            d3.select('#tooltip').style('display', 'none')
          })
          .on('click', (event, d: any) => {
            const stateCode = stateNameToCode(d.properties.name)
            router.push(`/state/${stateCode.toLowerCase()}`)
          })
    })
  }, [medicaidData, router])

  if (!medicaidData) {
    return <div>Loading...</div>
  }

  return (
      <div className="bg-gray-900 text-white">
        <div className="relative flex justify-center">
          <svg ref={svgRef}></svg>
          <div id="tooltip" className="absolute bg-gray-800 text-white p-2 border border-gray-600 rounded shadow-md pointer-events-none hidden"></div>
        </div>
        <div className="mt-4 flex justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#f72b50] mr-2"></div>
            <span>Not Adopted</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#4ecdc4] mr-2"></div>
            <span>Adopted</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#fdcb6e] mr-2"></div>
            <span>Adopted, Not Implemented</span>
          </div>
        </div>
      </div>
  )
}

export default USChoroplethMap

