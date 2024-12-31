import React from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
      <header className="bg-teal-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Medicaid Expansion Tracker</Link>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/resources" className="hover:underline">Resources</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Header

