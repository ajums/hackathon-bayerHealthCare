import Form from 'react-bootstrap/Form';

export default function HeightInput({ value, onChange }) {
  return (
    <Form.Group className="mb-2" controlId="formHeight">
      <Form.Label>Height (in cms)</Form.Label>
      <Form.Control type="number" placeholder="Enter your Height" value={value} onChange={onChange} />
    </Form.Group>
  );
}