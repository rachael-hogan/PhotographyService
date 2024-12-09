import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Photographers from './Photographers';

describe('Photographers Component', () => {
    beforeAll(() => {
        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            if (url === 'http://localhost:8000/api/photographers') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, name: 'John Doe', event_type: 'wedding', location: 'New York' },
                        { id: 2, name: 'Jane Smith', event_type: 'portrait', location: 'Los Angeles' },
                    ]),
                });
            } else if (url === 'http://localhost:8000/api/photographers/1') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([{ id: 1, name: 'John Doe', event_type: 'wedding', location: 'New York' }]),
                });
            } else if (url === 'http://localhost:8000/api/photographers/event/wedding') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([{ id: 1, name: 'John Doe', event_type: 'wedding', location: 'New York' }]),
                });
            }
            return Promise.reject(new Error('Not found'));
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('renders all photographers', async () => {
        render(<Photographers />);

        await waitFor(() => screen.getByText('Photographers'));

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    test('fetches and displays photographer details', async () => {
        render(<Photographers />);

        await waitFor(() => screen.getByText('John Doe'));

        fireEvent.click(screen.getByText('View Details'));

        await waitFor(() => screen.getByText('Photographer Details'));

        expect(screen.getByText('ID: 1')).toBeInTheDocument();
        expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
        expect(screen.getByText('Event Type: wedding')).toBeInTheDocument();
        expect(screen.getByText('Location: New York')).toBeInTheDocument();
    });

    test('fetches photographers by event type', async () => {
        render(<Photographers />);

        await waitFor(() => screen.getByText('Photographers'));

        fireEvent.change(screen.getByPlaceholderText('Enter event type'), { target: { value: 'wedding' } });
        fireEvent.keyDown(screen.getByPlaceholderText('Enter event type'), { key: 'Enter', code: 'Enter' });

        await waitFor(() => screen.getByText('John Doe'));

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
});