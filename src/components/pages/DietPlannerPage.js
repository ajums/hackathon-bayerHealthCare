import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppleImage from '../atoms/AppleImage';
import DietPlannerForm from '../organisms/DietPlannerForm';

export default function DietPlannerPage() {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '40px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div style={{
              background: '#222',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              color: 'white'
            }}>
              <Row>
                <Col md={6}>
                  <h1 className="mb-4">Personalized <br />Diet Planner</h1>
                  <h5 className="mb-4">Based on BMI</h5>
                </Col>
                <Col md={4} className="text-end">
                  <AppleImage />
                </Col>
              </Row>
              <DietPlannerForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}