import { useEffect, useState } from 'react'
import { D3BarChart } from '../../components'

export default function Post() {
  const [data, setData] = useState([])
  const newData = () => {
    const a = []
    for (let i = 0; i < 10; i++) {
      a.push({
        label: `Item ${i + 1}`,
        value: Math.random() * 25
      })
    }
    setData(a)
  }
  useEffect(() => {
    newData()
  }, [])
  return (
    <>
      <button
        className="bg-gray-light py-sm px-md rounded"
        onClick={ newData }
      >
        New Data
      </button>
      <D3BarChart
        data={ [...data] }
        margin={ {
          top: 10,
          right: 10,
          bottom: 50,
          left: 30
        } }
      />
    </>
  )
}
