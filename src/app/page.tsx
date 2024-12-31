import Image from "next/image";
import Header from "@/components/Header";
import USChoroplethMap from "@/components/USChoroplethMap";
import MedicaidInfo from "@/components/MedicaidInfo";

export default function Home() {
  return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <section className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
              {/* Removed redundant title */}
              <USChoroplethMap />
            </div>
          </section>
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <MedicaidInfo />
            </div>
          </section>
        </main>
        <footer className="bg-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-sm">
            © 2023 Medicaid Expansion Tracker. Data last updated: June 2023.
          </div>
        </footer>
      </div>
  )
}
