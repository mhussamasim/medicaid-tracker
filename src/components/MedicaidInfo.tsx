"use client"

import React from 'react'
import { Users, DollarSign, HeartPulse, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const MedicaidInfo: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
      <section className="pb-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Understanding Medicaid Expansion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center text-gray-700">
                <Users className="mr-2 h-6 w-6" />
                What is Medicaid Expansion?
              </h3>
              <p className="text-gray-600">
                Medicaid expansion is part of the Affordable Care Act (ACA) that allows states to extend Medicaid coverage to all adults under 65 with incomes up to 138% of the federal poverty level.
              </p>
            </div>
          </motion.div>

          <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center text-gray-700">
                <DollarSign className="mr-2 h-6 w-6" />
                Financial Impact
              </h3>
              <p className="text-gray-600">
                States that expand Medicaid receive increased federal funding. The federal government covers 90% of the costs for the newly eligible population, while states cover the remaining 10%.
              </p>
            </div>
          </motion.div>

          <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center text-gray-700">
                <HeartPulse className="mr-2 h-6 w-6" />
                Health Benefits
              </h3>
              <p className="text-gray-600">
                Medicaid expansion has been associated with improved access to care, better health outcomes, and reduced mortality rates among low-income adults.
              </p>
            </div>
          </motion.div>

          <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center text-gray-700">
                <TrendingUp className="mr-2 h-6 w-6" />
                Economic Effects
              </h3>
              <p className="text-gray-600">
                Studies have shown that Medicaid expansion can lead to increased employment, reduced medical debt, and overall positive economic impacts for states and individuals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
  )
}

export default MedicaidInfo

