import { render, screen } from "@testing-library/react";
import { MediaProvider } from '../../contexts/MediaContexts';
import Movies from '../../pages/Movies';

test('Movies Page render.', () => {
    render(<Movies />, { wrapper: MediaProvider })
    const element = screen.getByTestId('movies')
    expect(element).toBeInTheDocument();
});