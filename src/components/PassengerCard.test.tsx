import { describe } from 'vitest';
import { PassengerCard } from './PassengerCard';
import { render, screen } from '@testing-library/react';

describe('Passenger Card', () => {
  it('Should show passenger full name', () => {
    render(<PassengerCard fullName="Test Test" phone="123123" />);

    expect(screen.getByText(/Test Test/i)).toBeInTheDocument();
  });

  it('Should show passenger phone', () => {
    render(<PassengerCard fullName="Test Test" phone="123123" />);

    expect(screen.getByText(/123123/i)).toBeInTheDocument();
  });

  it('Should show passenger avatar fallback if url not present', () => {
    render(<PassengerCard fullName="Test Test" phone="123123" />);

    expect(
      screen.getByLabelText('Test Test avatar', { selector: 'div' }),
    ).toBeInTheDocument();
  });

  it('Should show passenger avatar image if url present', () => {
    render(
      <PassengerCard
        fullName="Test Test"
        phone="123123"
        avatarUrl="https://github.com/TheBrunoDias.png"
      />,
    );

    expect(screen.getByAltText('Test Test avatar')).toBeInTheDocument();
  });
});
