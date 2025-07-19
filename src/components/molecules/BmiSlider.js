import Form from 'react-bootstrap/Form';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomRange from '../atoms/CustomRange';

export default function BmiSlider({ value, setValue, rangeRef, target, isClient }) {
  return (
    <Form.Group controlId="formBmiRange">
      <Form.Label>Your BMI</Form.Label>
      <CustomRange value={value} onChange={e => setValue(e.target.value)} rangeRef={rangeRef} />
      <div className="d-flex justify-content-between mt-1">
        <small>10 (Low)</small>
        <small>25 (Normal)</small>
        <small>40 (High)</small>
      </div>
      {isClient && (
        <Overlay target={target} show={isClient} placement="top">
          {(props) => (
            <Tooltip id="range-tooltip" {...props}>
              {value}
            </Tooltip>
          )}
        </Overlay>
      )}
    </Form.Group>
  );
}