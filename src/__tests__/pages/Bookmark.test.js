import { render, screen } from '@testing-library/react';
import { MediaProvider } from '../../contexts/MediaContexts';
import Bookmark from '../../pages/Bookmark';

test('Bookmark Page render.', () => {
    render(<Bookmark />, { wrapper: MediaProvider })
    const element = screen.getByTestId('bookmark')
    expect(element).toBeInTheDocument();
});