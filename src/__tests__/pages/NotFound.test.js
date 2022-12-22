import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

test('NotFound Page render.', () => {
    render(<NotFound />, { wrapper: BrowserRouter })
    const component = screen.getByText(/Error 404/i)
    expect(component).toBeInTheDocument();
});