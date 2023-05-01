import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import userEvent from '@testing-library/user-event';

// Mocks
import mockFetchShow from '../../api/fetchShow'
jest.mock('../../api/fetchShow');

const showTestObject = {
    name: "Test Show",
    seasons: [{
        id: 1,
        name: "Season 1",
        episodes: []
    },
    {
        id: 2,
        name: "Season 2",
        episodes: []
    }],
    summary: "This is a test summary.",
};

test('renders without errors with no props', () => { 
    render(<Display />);
});

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(showTestObject); 
    render(<Display />);
    const button = screen.getByText(/press to get show data/i);
    const user = userEvent.setup();

    await user.click(button);
    const show = await screen.findByTestId(/show-container/i);
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(showTestObject); 
    render(<Display />);
    const button = screen.getByText(/press to get show data/i);
    const user = userEvent.setup();

    await user.click(button);
    const seasonOptions = await screen.findAllByTestId(/season-option/i);
    expect(seasonOptions).toHaveLength(2);
 });
