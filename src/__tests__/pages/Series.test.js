import { render, screen } from '@testing-library/react';
import { MediaProvider } from '../../contexts/MediaContexts';
import Series from '../../pages/Series';

test('Series Page render.', () => {
    render(<Series />, { wrapper: MediaProvider })
    const element = screen.getByTestId('series')
    expect(element).toBeInTheDocument();
});