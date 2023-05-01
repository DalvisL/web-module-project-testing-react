import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event';

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

test('renders without errors', () => { 
    render(<Show show={showTestObject} selectedSeason={"none"}/>);
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} selectedSeason={"none"}/>);
    const loadingElement = screen.getByTestId(/loading-container/i);
    expect(loadingElement).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={showTestObject} selectedSeason={"none"}/>);
    const seasonOptions = screen.getAllByTestId(/season-option/i);
    expect(seasonOptions).toHaveLength(2);
});

test('handleSelect is called when an season is selected', async () => { 
    const handleSelect = jest.fn((event) => {
        console.log('selected season: ', event.target.value);
    });

    render(<Show show={showTestObject} selectedSeason={"none"} handleSelect={handleSelect}/>);
    // setting up userEvent instance to use selectOptions method
    const user = userEvent.setup();
    const select = screen.getByLabelText(/select a season/i);
    await user.selectOptions(select, '1');
    
    expect(handleSelect).toHaveBeenCalledTimes(1); 
    
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={showTestObject} selectedSeason={"none"}/>);
    let episodes = screen.queryByTestId(/episodes-container/i);
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={showTestObject} selectedSeason={1}/>);
    episodes = screen.queryByTestId(/episodes-container/i);
    expect(episodes).toBeInTheDocument();
 });
