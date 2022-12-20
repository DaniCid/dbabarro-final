The following technologies were used in this project:
- React
- Sass
- HTML
- Javascript

Aswell as some libraries:
- react-router-dom
To allow me to route every page in my project.

- axios
To be able to fetch data from the API endpoints.

- react-infinite-scroll-component
Let me import a component who handle by himself my infinite scroll pagination.

La idea era crear una aplicación que me ofreciera información sobre series y películas, más concretamente si estaban disponibles en determinado catálogo de streaming y en cuál de ellos. El Home me ofrece información de actualidad, cómo qué películas están en cartelera y qué es trending esta semana. Necesitaba dos páginas dedicadas para Series y Películas, respectivamente. Y por último tengo la posibilidad de buscar directamente con un buscador.

La información directa (la que no requiere hacer click en la serie/pelicula) debía ser concisa. El título, una fecha (para facilitar diferenciar reboots o películas con títulos similares) y una nota que indique la calidad del show. El sistema de bookmarks me permite marcar como favorito una serie o pelicula para que aparezca luego en mi página de 'Mi Lista'.

Si entramos en una de las películas obtendremos información mucho más concreta. Empezando por un overview general con datos como los géneros, la duración media del capítulo o de la película, la sinopsis y un adelanto de qué servicios de streaming la tienen en catálogo. Así como una muestra del cast principal y de los personajes que interpretan.

El menú de información me permite expandir esa información a un pequeño resumen de las temporadas (exclusivo de las series), información más detallada de dónde ver, comprar o alquilar la pelicula o serie en cuestión. Y por último, una pequeña galería.

Por último, la intención era ofrecer todo lo citado previamente en cualquier idioma y región (dentro de las posibilidades de la API). Para este proyecto se ha utilizado el español, el francés y el inglés estadounidense, siendo este último el idioma por defecto de la página.

Wireframes:
As a wireframe for this project I decided to make an early demo on simple html/css, to make sure that i liked the design and everything was lining up.

- Header: ![Wireframe-Header](https://user-images.githubusercontent.com/109437140/208703204-a763cc06-075f-476d-a792-b16b79c76617.jpg)
- Home: ![Wireframe-General](https://user-images.githubusercontent.com/109437140/208703184-78fc5fdd-2c2a-4656-aa0f-28e7097488f7.jpg)
- Info: ![Wireframe-Info](https://user-images.githubusercontent.com/109437140/208703218-4aa4b3ce-1529-4c42-923e-5f3604360103.jpg)

Issues:
The principal issue was the first choice of the API, not only the information was scattered around a lot of endpoints but the monthly limit for the free membership was way too low. I then gave a try to TMDB, one of the two major movie databases on internet. It worked perfectly with no limit at all.

Others issues had to do with design. All of the posters that the API return are vertical ones. The initial design of the project had horizontal images to view the different shows, I had to change them and came up with a new -and better- design overall. Cleaner, less piled up.

The bookmark system has been a bit of a headache at first, as they had to be saved on local storage to keep eevrything bookmarked by the user even if the page refreshed. But it has been easily fixed keeping a reference on localStorage to know when somethign was or not in my bookmarks and refresh the icon.

Seasons had a weird way of being returned by the API, it was pretty hard to try and build and reset the array who contained my seasons info objects. I came up with an idea to show every season with a menu, one by one, and avoid the issues with React async functions who made it pretty hard to display it in the first place.
