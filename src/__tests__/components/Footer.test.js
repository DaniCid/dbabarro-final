import { render, screen } from '@testing-library/react';
import { MediaProvider } from '../../contexts/MediaContexts';
import Footer from '../../components/Footer';

test('Footer render.', () => {
    render(<Footer />, { wrapper: MediaProvider })
    const element = screen.getByTestId('footer')
    expect(element).toBeInTheDocument()
});