import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 py-4 left-0 right-0 text-center">
      <p className="text-sm text-gray-400">
        <Link
          href="https://albert.lol"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          albert
        </Link>
        {' | '}
        <Link
          href="https://github.com/skidoodle/erettsegi-browser"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          github
        </Link>
      </p>
    </div>
  )
}

export default Footer
