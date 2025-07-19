import { useRef, useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import HeightInput from '../molecules/HeightInput';
import ActivityLevelSelect from '../molecules/ActivityLevelsSelect';
import BmiSlider from '../molecules/BmiSlider';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default function DietPlannerForm() {
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('');
  const [value, setValue] = useState(22);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const rangeRef = useRef(null);
  const [target, setTarget] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const [ValidationError, setValidationError] = useState({
    height: '',
    activity: '',
    bmi: ''
  });

  useEffect(() => {
    setIsClient(true);
    if (rangeRef.current) setTarget(rangeRef.current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(prev => ({
        ...prev,
        height: height==="" ? 'Height is required' : '',
    }));
    setValidationError(prev => ({
        ...prev,
        activity: activity==="" ? 'Activity level is required' : '',
    }));
    if(height==="" || activity==="") {
        return;
    }
    setLoading(true);
    setResult(null);
    console.log('Submitting:', { height, activity, value });
    try {
      const res = await fetch('http://localhost:3005/generateplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          height,
          activity,
          bmi: value
        })
      });
      const data = await res.json();
      if(data.status=="success"){
        setResult(data.plans);
      }
    } catch (err) {
      setResult({ error: 'Failed to generate plan' });
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} className="mb-3">
          <HeightInput value={height} onChange={e => setHeight(e.target.value)} />
            {ValidationError.height && (
                <div className="text-danger">{ValidationError.height}</div>
            )}
        </Col>
        <Col md={6} className="mb-3">
          <ActivityLevelSelect value={activity} onChange={e => setActivity(e.target.value)} />
            {ValidationError.activity && (
                <div className="text-danger">{ValidationError.activity}</div>
            )}
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mb-3">
          <BmiSlider value={value} setValue={setValue} rangeRef={rangeRef} target={target} isClient={isClient} />
        </Col>
      </Row>
      <Row>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </Button>
      </Row>
      {result && (
        <Row className="mt-3">
            <Container className="my-4">
            <h3 className="mb-4 text-center">Personalized Diet Plans</h3>

            {result.length > 0 ? (
                <Row xs={1} sm={2} md={3} className="g-4">
                {result.map((plan, index) => (
                    <Col key={index}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                        <Card.Title className="mb-2">{plan.description}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {plan.food_type_name} | {plan.calories} kcal
                        </Card.Subtitle>
                        <hr />
                        <p className="mb-1"><strong>Height:</strong> {plan.height} cm</p>
                        <p className="mb-1"><strong>Activity Level:</strong> {plan.activity_level}</p>
                        <p className="mb-1"><strong>BMI Range:</strong> {plan.bmi_min} - {plan.bmi_max}</p>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">
                            Created on: {new Date(plan.created_on).toLocaleDateString()}
                        </small>
                        </Card.Footer>
                    </Card>
                    </Col>
                ))}
                </Row>
            ) : (
                <div className="text-center text-muted mt-4" >
                <p style={{ fontSize: '1.2rem',fontWeight: 'bold',color: 'white' }}>No diet plans available!!</p>
                </div>
            )}
            </Container>
            {/* <Col>
            <pre style={{ color: 'white' }}>{JSON.stringify(result, null, 2)}</pre>
          </Col> */}
        </Row>
    )}
    </Form>
  );
}