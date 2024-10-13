import React from "react"

const Banner = ({ children }) => {
  return (
    <div class="bg-destructive px-4 py-3 text-center text-white">
      {children}
    </div>
  )
}

export default Banner
