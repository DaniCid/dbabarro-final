import { render, screen } from '@testing-library/react';
import { MediaProvider } from '../../contexts/MediaContexts';
import Header from '../../components/Header';

test('Header render.', () => {
    render(<Header />, { wrapper: MediaProvider })
    const element = screen.getByTestId('header')
    expect(element).toBeInTheDocument()
});