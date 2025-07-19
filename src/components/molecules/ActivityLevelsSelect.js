import Form from 'react-bootstrap/Form';
import CustomSelect from '../atoms/CustomSelect';

export default function ActivityLevelSelect({ value, onChange }) {
  return (
    <Form.Group className="mb-3" controlId="formActivityLevel">
      <Form.Label>Activity Level</Form.Label>
      <CustomSelect value={value} onChange={onChange} />
    </Form.Group>
  );
}