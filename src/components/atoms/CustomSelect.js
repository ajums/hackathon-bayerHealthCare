import Form from 'react-bootstrap/Form';

export default function CustomSelect({ value, onChange }) {
  return (
    <Form.Control as="select" value={value} onChange={onChange}>
      <option value="" disabled>Select your activity level</option>
      <option value="slightly">Slightly</option>
      <option value="moderate">Moderate</option>
      <option value="high">High</option>
    </Form.Control>
  );
}