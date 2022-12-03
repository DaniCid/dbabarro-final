import CardsList from './components/CardsList'
import Header from './components/Header'
import { useMedias } from './contexts/MediaContexts'
import AddSerie from './components/AddSerie'
import AddMovie from './components/AddMovie'
import DataFromApi from './components/DataFromApi'

function App() {

  const { series, movies } = useMedias()

  const cardsDisplay = 5

  return (
    <>
      <Header />
      <main>
        <CardsList title={'Top Series'} series={series} display={cardsDisplay}/>
        <CardsList title={'Top Movies'} movies={movies}/>
        <AddSerie />
        <AddMovie />
        <DataFromApi />
      </main>
    </>
  );
}

export default App;
