import CardsList from './components/CardsList'
import Header from './components/Header'
import { DISPLAY_MAX_TRENDING } from './contexts/MediaContexts'
import DataFromApi from './components/DataFromApi'

function App() {


  return (
    <>
      <Header />
      <main>
        <CardsList category={'Trending'} display={DISPLAY_MAX_TRENDING} menu />
        <DataFromApi />
      </main>
    </>
  );
}

export default App;
