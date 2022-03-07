import { db } from '../../util/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Card, Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../Loading'

const BuildingsList = () => {
  
  const [hasData, setHasData] = useState(0)
  const [data, setData] = useState([])
  const [keys, setKeys] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    onValue(ref(db, 'ratings'), (snapshot) => {
      var housing = []
      var housingKeys = []
      snapshot.forEach((child) => {
        housing.push(child.val())
        housingKeys.push(child.key)
      })
      setData(housing)
      setHasData(1)
      setKeys(housingKeys)
      console.log(housing)
      console.log(housingKeys)
      setLoading(false)
    })
    return () => {}
  }, [])

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
      <center>
        <img src="https://external-preview.redd.it/ZvJ-OZpSX3XQ1DsVzTyJ8qMl0fl95JxOrzma5dvcyJM.jpg?width=640&crop=smart&auto=webp&s=3f1f667ecc3c818a1cbe86897178f8b4c31b0794"
        alt="Hill map" width = "960" height = "650">
        </img>
      </center>
  )
}

export default BuildingsList
