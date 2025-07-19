import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DietPlannerForm from './DietPlannerForm';
import '@testing-library/jest-dom/extend-expect';

// 🧪 Mock child components (molecules)
jest.mock('../molecules/HeightInput', () => (props) => (
  <input
    data-testid="height-input"
    value={props.value}
    onChange={props.onChange}
    placeholder="Height"
  />
));

jest.mock('../molecules/ActivityLevelSelect', () => (props) => (
  <select
    data-testid="activity-select"
    value={props.value}
    onChange={props.onChange}
  >
    <option value="">Select Activity</option>
    <option value="low">Low</option>
    <option value="moderate">Moderate</option>
    <option value="high">High</option>
  </select>
));

jest.mock('../molecules/BmiSlider', () => (props) => (
  <input
    data-testid="bmi-slider"
    type="range"
    value={props.value}
    onChange={(e) => props.setValue(Number(e.target.value))}
  />
));

// 🧪 Mock dynamic import: html2pdf.js
jest.mock('html2pdf.js', () => ({
  __esModule: true,
  default: () => ({
    set: () => ({
      from: () => ({
        save: jest.fn(),
      }),
    }),
  }),
}));

// 🧪 Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        status: 'success',
        plans: [
          {
            meal: 'Breakfast',
            description: 'Oats and Fruits',
            food_type_name: 'veg',
            calories: 250,
            created_on: new Date().toISOString(),
          },
        ],
      }),
  })
);

describe('DietPlannerForm Organism', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the form with inputs and button', () => {
    render(<DietPlannerForm />);
    expect(screen.getByTestId('height-input')).toBeInTheDocument();
    expect(screen.getByTestId('activity-select')).toBeInTheDocument();
    expect(screen.getByTestId('bmi-slider')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate plan/i })).toBeInTheDocument();
  });

  it('shows validation messages if form is submitted empty', async () => {
    render(<DietPlannerForm />);
    fireEvent.click(screen.getByRole('button', { name: /generate plan/i }));
    expect(await screen.findByText('Height is required')).toBeInTheDocument();
    expect(await screen.findByText('Activity level is required')).toBeInTheDocument();
  });

  it('submits form and displays generated plan cards', async () => {
    render(<DietPlannerForm />);
    fireEvent.change(screen.getByTestId('height-input'), { target: { value: '170' } });
    fireEvent.change(screen.getByTestId('activity-select'), { target: { value: 'moderate' } });
    fireEvent.click(screen.getByRole('button', { name: /generate plan/i }));

    await waitFor(() => {
      expect(screen.getByText('Personalized Diet Plans')).toBeInTheDocument();
      expect(screen.getByText('Breakfast')).toBeInTheDocument();
      expect(screen.getByText('Oats and Fruits')).toBeInTheDocument();
      expect(screen.getByText(/250 kcal/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /export as pdf/i })).toBeInTheDocument();
    });
  });
});