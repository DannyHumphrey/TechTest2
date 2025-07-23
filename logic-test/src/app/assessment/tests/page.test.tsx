import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock useSearchParams from next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => '20',
  }),
}));

import Assessment from '../page';

describe('Assessment component', () => {
  it('shows error when form submitted with all missing answers', async () => {
    render(<Assessment />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(
      screen.getByText('Please answer all questions')
    ).toBeInTheDocument();
  });

  it('shows error when form submitted with partial missing answers', async () => {
    render(<Assessment />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    const yesRadios = screen.getAllByLabelText('Yes');
    await userEvent.click(yesRadios[0]);
    expect(
      screen.getByText('Please answer all questions')
    ).toBeInTheDocument();
  });

  it('shows info message for healthy responses', async () => {
    render(<Assessment />);
    const yesRadios = screen.getAllByLabelText('Yes');
    await userEvent.click(yesRadios[0]);
    await userEvent.click(yesRadios[1]);
    await userEvent.click(yesRadios[2]);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(
      screen.getByText(
        /Thank you for answering our questions, we don't need to see you/
      )
    ).toBeInTheDocument();
  });

  it('shows waning message for un-healthy responses', async () => {
    render(<Assessment />);
    const yesRadios = screen.getAllByLabelText('Yes');
    const noRadios = screen.getAllByLabelText('No');

    await userEvent.click(yesRadios[0]);
    await userEvent.click(yesRadios[1]);
    await userEvent.click(noRadios[2]);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(
      screen.getByText(
        /We think there are some simple things you could do to improve you quality of life, please phone to book an appointment/
      )
    ).toBeInTheDocument();
  });
});