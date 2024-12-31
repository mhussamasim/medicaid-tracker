import { NextResponse } from 'next/server'

const medicaidData = {
  "AL": 0, "AK": 1, "AZ": 1, "AR": 1, "CA": 1, "CO": 1, "CT": 1, "DE": 1, "FL": 0, "GA": 0,
  "HI": 1, "ID": 1, "IL": 1, "IN": 1, "IA": 1, "KS": 0, "KY": 1, "LA": 1, "ME": 1, "MD": 1,
  "MA": 1, "MI": 1, "MN": 1, "MS": 0, "MO": 1, "MT": 1, "NE": 1, "NV": 1, "NH": 1, "NJ": 1,
  "NM": 1, "NY": 1, "NC": 0, "ND": 1, "OH": 1, "OK": 1, "OR": 1, "PA": 1, "RI": 1, "SC": 0,
  "SD": 1, "TN": 0, "TX": 0, "UT": 1, "VT": 1, "VA": 1, "WA": 1, "WV": 1, "WI": 0, "WY": 0
}

export async function GET() {
  return NextResponse.json(medicaidData)
}

