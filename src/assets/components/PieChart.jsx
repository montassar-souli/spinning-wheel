import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'

const PieChart = () => {

  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  useEffect(()=>{

  },
[])

  return (
    <div>
      <canvas ref={chartRef} style={{width:"300px",height:"200px"}} />
    </div>
  )
}

export default PieChart