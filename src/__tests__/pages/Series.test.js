import { getByTestId, render, screen } from "@testing-library/react";
import { MediaProvider } from '../../contexts/MediaContexts';
import Series from '../../pages/Series';

test('Series Page render.', () => {
    const { component } = render(<Series />, { wrapper: MediaProvider })
    const element = screen.getByTestId('series')
    expect({ component }).toContain(element);
});