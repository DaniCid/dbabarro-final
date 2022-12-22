import { render, screen } from '@testing-library/react';
import { MediaProvider } from '../../contexts/MediaContexts';
import Navbar from '../../components/Navbar';
import { BrowserRouter } from 'react-router-dom';

test('Navbar render.', () => {
    render(<BrowserRouter><Navbar /></BrowserRouter>, { wrapper: MediaProvider })
    const element = screen.getByTestId('navbar')
    expect(element).toBeInTheDocument()
});