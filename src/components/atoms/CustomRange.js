import Form from 'react-bootstrap/Form';

export default function CustomRange({ value, onChange, rangeRef }) {
  return (
    <Form.Range
      min={10}
      max={40}
      step={0.1}
      value={value}
      ref={rangeRef}
      onChange={onChange}
      style={{ position: 'relative' }}
    />
  );
}