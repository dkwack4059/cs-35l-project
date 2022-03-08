import { Link, Outlet } from 'react-router-dom'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { signOut } from 'firebase/auth'
import { auth } from '../util/firebaseConfig'
import { GiBirdHouse } from "react-icons/gi";

const Home = () => {
  const logout = async () => {
    await signOut(auth)
  }

  return (
    <Container>
      <div>
        <GiBirdHouse />
        <Row className="mt-3">
          <Col md={{ span: 4, offset: 9 }}>
            <div className="text-center">
              <Button variant="primary" onClick={logout}>
                <h5>Log Out</h5>
              </Button>
            </div>
          </Col>
        </Row>
        <div style={{marginTop: "20px"}}>
          <nav style={{ borderBottom: 'solid 3px', paddingBottom: '1rem' }}>
            <Row>
              <Col >
                <Link to="/">
                  <h4>Home</h4>
                </Link>
              </Col>
              <Col>
                <Link to="/residential-buildings">
                  <h4>Star Ratings</h4>
                </Link>
              </Col>
              <Col>
                <Link to="/firestore-test">
                  <h4>Written Reviews</h4>
                </Link>
              </Col>
              <Col>
                <Link to="/filtersearch-test">
                  <h4>Filter Search</h4>
                </Link>
              </Col>
              <Col>
                <Link to="/personallist-test">
                  <h4>Personal List</h4>
                </Link>
              </Col>
            </Row>
          </nav>
          <br />
          <br />
          <Outlet />
        </div>
      </div>
    </Container>
  )
}

export default Home
