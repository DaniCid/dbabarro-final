import CardsList from './components/CardsList'
import Header from './components/Header'
import DataFromApi from './components/DataFromApi'
import { DISPLAY_MAX_TRENDING, SLIDER_GAIN } from './contexts/MediaContexts'

function App() {
	return (
		<>
			<Header />
			<main>
				<CardsList category={'Now in Theaters'} display={SLIDER_GAIN} theaters />
				<CardsList category={'Trending'} display={DISPLAY_MAX_TRENDING} menu />
				<DataFromApi />
			</main>
		</>
	);
}

export default App;
