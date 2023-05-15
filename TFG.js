let marcadores2 = [];
let polylineLayer;
let heatmapLayer;
let button;
let contador;

//////////////////////////////////////////////BOTÓN 1//SOLUCIÓN 1 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////

//BOTÓN 1//SOLUCIÓN 1 A DIFERENTE NIVEL DE GRANULARIDAD
function loadJSONAndAddMarkers1(map){
	markers.clearLayers();
	fetch('JSON/salida10.json')
		.then(response => response.json())
		.then(data => {
			const loadedURIs = new Set();
			// Agregue la leyenda al mapa
			legend.addTo(map);
			document.querySelector('.leyenda').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda').style.display = 'none';
			});
			for (let item in data.results.bindings) {
				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				let valorPlace = punto.place.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;

				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
				const marker = L.marker([lat, lng], {
					uri: valorUri,
					id: valorPlace.split('/')[3]
				})
					.bindPopup(popupContent)
					.addTo(markers);
				loadedURIs.add(valorUri);
				marker.on('click', consultarClase);
			}
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}

///////////////////////////////////////////////////BOTÓN 2//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////////

function loadJSONAndAddMarkers2(map, filtro){
	contador=0;
	markers.clearLayers();
	fetch('JSON/salida10.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();
			// Agregue la leyenda al mapa
			legend4.addTo(map);
			document.querySelector('.leyenda1').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda1').style.display = 'none';
			});
			// Carga los marcadores de salida3
			for (let item in data.results.bindings) {

				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;
				let valorPlace = punto.place.value;
				let clase = mapaClases.get(valorPlace.split('/')[3]);
				let popupClass = 'blue-popup'; // establecer una clase por defecto si no se encuentra una clase 
				let markerColor = 'blue';
				//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD

				// Determina el color del marcador según si la etiqueta contiene una coma o no
				
				if(filtro){
					
					switch (clase) {
						 // usar una sentencia switch para evaluar el valor de valorPlace
						case  'P': popupClass = 'green-popup';
							markerColor = 'green';
							if (filtro === 'P') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});

								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};

								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							}break;
						case 'A': popupClass = 'red-popup';
							markerColor = 'red';
							if (filtro === 'A') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});

								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};

								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'V': popupClass = 'orange-popup';
							markerColor = 'orange';
							if (filtro === 'V') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});

								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};

								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							}break;
						case 'T': popupClass = 'yellow-popup';
							markerColor = 'yellow';
							if (filtro === 'T') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});

								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};

								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'L': popupClass = 'gray-popup';
							markerColor = 'gray';
							if (filtro === 'L') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});

								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};

								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'R': popupClass = 'white-popup';
							markerColor = 'white';
							if (filtro === 'R') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});

								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};

								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'S': popupClass = 'black-popup';
							markerColor = 'black';
							if (filtro === 'S') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});

								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};

								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'H': popupClass = 'violet-popup';
							markerColor = 'violet';
							if (filtro === 'H') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});

								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};

								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
					}
					
				}
		
			}
			if(filtro && contador===0){
			alert('No hay marcadores en esta categoría');
		}

		})
		
		.catch(error => console.error('Error cargando el archivo JSON:', error));
		
}

///////////////////////////////////////////////BOTÓN 2- TODOS//SOLUCIÓN DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////////////////////


//BOTÓN 2//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD
function loadJSONAndAddMarkers21(map) {
	markers.clearLayers();
	fetch('JSON/salida10.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();

			// Carga los marcadores de salida3
			for (let item in data.results.bindings) {
				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;
				let valorPlace = punto.place.value;
				let clase = mapaClases.get(valorPlace.split('/')[3]);
				let popupClass = 'blue-popup'; // establecer una clase por defecto si no se encuentra una clase adecuada 
				let markerColor = 'blue';
				//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD

				// Determina el color del marcador según si la etiqueta contiene una coma o no

				if (clase) {
					switch (clase) { // usar una sentencia switch para evaluar el valor de valorPlace
						case 'P': popupClass = 'green-popup', markerColor = 'green'; break;
						case 'A': popupClass = 'red-popup', markerColor = 'red'; break;
						case 'V': popupClass = 'orange-popup', markerColor = 'orange';; break;
						case 'T': popupClass = 'yellow-popup', markerColor = 'yellow';; break;
						case 'L': popupClass = 'gray-popup', markerColor = 'gray';; break;
						case 'R': popupClass = 'white-popup', markerColor = 'white';; break;
						case 'S': popupClass = 'black-popup', markerColor = 'black';; break;
						case 'H': popupClass = 'blue-popup', markerColor = 'blue';; break;
					}
				}

				const markerIcon = L.icon({
					iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
					shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
					shadowSize: [41, 41],

				});

				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
				const popupOptions = {
					className: popupClass,
				};

				const marker = L.marker([lat, lng], {
					icon: markerIcon,
					uri: valorUri,
				})
					.bindPopup(popupContent, popupOptions)
					.addTo(markers)
				loadedURIs.add(valorUri);
			}


		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}



//////////////////////////////////////////////////////BOTÓN 3//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES////////////////////////////////////////////////////////////////////////////////////////////////////


//BOTÓN 3//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES
function loadJSONAndAddMarkers3(map) {
	//L.Icon.Default.prototype.options.className = 'transparent-marker';
	markers.clearLayers();

	fetch('JSON/salida10.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();
			// Agregue la leyenda al mapa
			legend2.addTo(map);
			document.querySelector('.leyenda2').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda2').style.display = 'none';
			});

			// Carga los marcadores de salida3

			for (let item in data.results.bindings) {
				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;
				const placename = punto.placename.value;
				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;

				// verifica si la uri no ha sido cargada
				if (!loadedURIs.has(valorUri)) {
					const marker = L.marker([lat, lng], {
						uri: valorUri,
						principal: true,
						placename: placename
					})
						.bindPopup(popupContent)
						.addTo(markers);
					// agrega la uri actual a loadedURIs
					loadedURIs.add(valorUri);


				} else {
					// Si la URI ya ha sido cargada, crea el marcador y le agrega la clase leaf-transparent
					const markerHtmlStyles = `
              background-color: #FF0000;
              width: 2rem;
              height: 2rem;
              display: block;
              left: -1.5rem;
              top: -1.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF`;
					const labelMarkerStyle = `
              color:white;
              transform: rotate(-45deg);
              width: 2rem;
              height: 2rem;
              text-align: center;
              font-size: 0.75rem;
              padding-top: 5px;
              font-weight: bold;
              `;
					const customIconLabel = L.divIcon({
						className: "leaf-transparent",
						iconAnchor: [-8, 16],
						labelAnchor: [-6, 0],
						popupAnchor: [0, -36],
						html: `<span style="${markerHtmlStyles}"><p style="${labelMarkerStyle}">7</p></span>`,
					});

					const marker = L.marker([lat, lng], {
						uri: valorUri,
						icon: customIconLabel,
						principal: false,
						placename: placename
					})
						.bindPopup(popupContent)
						.addTo(markers)

				}

			}

			//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES

			// Se recorre el Set de URI
			for (let i of loadedURIs.values()) {
				let uri = i;
				let uriCount = 0;
				let markerWithUri;
				markers.eachLayer(function(layer) {
					const layerUri = layer.options.uri;
					if (layerUri === uri) {
						uriCount++;
						markerWithUri = layer;
					}
				});

				if (uriCount === 1) {
					markerWithUri.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));
				}
				if (uriCount >= 2) {
					// Se obtienen los marcadores asociados a la URI
					let marcadoresURI = findMarcadoresByUri(uri);

					// Nos quedamos con el primero: será sobre el que se cambiará el icono
					let marcadorOrange = marcadoresURI[0];

					marcadorOrange.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));
					// Añadimos el evento click al marcador del icono naranja para que añada/elimine un marcador amarillo en las posiciones de los otros marcadores con la misma uri
					marcadorOrange.on('click', anadirMarcadoresSecundarios);
				}
			}

		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}



//////////////////////////////////////////////////////BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES////////////////////////////////////////////////////////////////////////////////////////////////////



//BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES
function loadJSONAndAddMarkers4(map) {
	//L.Icon.Default.prototype.options.className = 'transparent-marker';
	markers.clearLayers();

	fetch('JSON/salida10.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();
			// Carga los marcadores de salida3
			// Agregue la leyenda al mapa
			legend3.addTo(map);
			document.querySelector('.leyenda3').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda3').style.display = 'none';
			});
			for (let item in data.results.bindings) {
				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;
				const placename = punto.placename.value;
				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;

				// verifica si la uri no ha sido cargada
				if (!loadedURIs.has(valorUri)) {
					const marker = L.marker([lat, lng], {
						uri: valorUri,
						principal: true,
						placename: placename,
						popupContent: popupContent
					})
						.bindPopup(popupContent)
						.addTo(markers);
					// agrega la uri actual a loadedURIs
					loadedURIs.add(valorUri);

				} else {
					// Si la URI ya ha sido cargada, crea el marcador y le agrega la clase leaf-transparent
					const markerHtmlStyles = `
              background-color: #FF0000;
              width: 2rem;
              height: 2rem;
              display: block;
              left: -1.5rem;
              top: -1.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF`;
					const labelMarkerStyle = `
              color:white;
              transform: rotate(-45deg);
              width: 2rem;
              height: 2rem;
              text-align: center;
              font-size: 0.75rem;
              padding-top: 5px;
              font-weight: bold;
              `;
					const customIconLabel = L.divIcon({
						className: "leaf-transparent",
						iconAnchor: [-8, 16],
						labelAnchor: [-6, 0],
						popupAnchor: [0, -36],
						html: `<span style="${markerHtmlStyles}"><p style="${labelMarkerStyle}">7</p></span>`,
					});

					const marker = L.marker([lat, lng], {
						uri: valorUri,
						icon: customIconLabel,
						principal: false,
						placename: placename,
						popupContent: popupContent
					})
						.bindPopup(popupContent)
						.addTo(markers)

				}


			}

			//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES

			// Se recorre el Set de URI
			for (let i of loadedURIs.values()) {
				let uri = i;


				let uriCount = 0;
				let markerWithUri;
				markers.eachLayer(function(layer) {
					const layerUri = layer.options.uri;
					if (layerUri === uri) {
						uriCount++;
						markerWithUri = layer;
					}
				});

				if (uriCount === 1) {
					markerWithUri.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));
				}
				if (uriCount >= 2) {
					// Si  hay un marcador con principal=true y q no sea único, cambiamos el color del primer marcador con esa URI
					let marcadoresURI = findMarcadoresByUri(uri);

					let marcadorOrange = marcadoresURI[0];

					marcadorOrange.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));


					// Añadimos el evento click al marcador del icono naranja para que añada/elimine un marcador amarillo 
					//en las posiciones de los otros marcadores con la misma uri
					marcadorOrange.on('click', anadirMapaCalor);
				}
			}

		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}

///////////////////////////////////////////////////////////FUNCIONES NECESARIAS//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////DEFINIMOS EL COLOR DE LA ETIQUETA SEGÚN SU CATEGORÍA PARA TÉCNICA 1:NIVEL DE GRANULARIDAD//////////////////////////////////////////////////////////////////////////////////////////


/**
 * Consulta el servicio a partir de un marker y cambia el color de fondo y texto del popup en función de la clase
 */
function consultarClase(e) {
	let marker = e.target;
	let id = marker.options.id;
	let clase = getClassByPlace(id);
	let fondo = 'blue'; // establecer una clase por defecto si no se encuentra una clase adecuada en las condiciones siguientes

	if (clase) {
		switch (clase) { // usar una sentencia switch para evaluar el valor de valorPlace
			case 'P': fondo = 'green'; break;
			case 'A': fondo = 'red'; break;
			case 'V': fondo = 'orange'; break;
			case 'T': fondo = 'yellow'; break;
			case 'L': fondo = 'gray'; break;
			case 'R': fondo = 'white'; break;
			case 'S': fondo = 'black'; break;
			case 'H': fondo = 'violet'; break;
		}
	}

	let popup = marker.getPopup();
	let estiloPopup = popup.getElement().children[0].style;
	estiloPopup.background = fondo;
	estiloPopup.color = getColorLetraByFondo(fondo);
}

//////////////////////////////////DEFINIMOS COLOR DEL TEXTO DE ETIQUETAS PARA TÉCNICA 1:NIVEL DE GRANULARIDAD//////////////////////////////////////////////////////////////////////////////////////////


/**
 * Obtiene el color del texto en función del color del fondo. Por defecto la letra es negra
 */
function getColorLetraByFondo(fondo) {
	let color = 'black';

	switch (fondo) {
		case 'green':
		case 'red':
		case 'black':
		case 'violet':
		case 'blue':
			color = 'white';
			break;
	}

	return color;
}

//////////////////////////////////BUCAMOS MARCADORES PRINCIPALES PARA TÉCNICAS:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Funcion para buscar los marcadores que contienen la URI indicada, aparecen mas de una vez  y son la principal.
 */
function findMarcadoresByUri(uri) {
	let marcadores = [];

	markers.eachLayer(function(layer) {
		if (layer.options.uri === uri && layer.options.principal == true) {
			marcadores.push(layer);
		}
	});
	return marcadores;
}

//////////////////////////////////BUCAMOS MARCADORES SECUNDARIOS PARA TÉCNICAS:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Funcion para buscar los marcadores que contienen la URI indicada y son las multiples.
 */
function findMarcadoresByUriFalse(uri) {
	let marcadores = [];

	markers.eachLayer(function(layer) {
		if (layer.options.uri === uri && layer.options.principal == false) {
			marcadores.push(layer);
		}
	});
	return marcadores;
}


//////////////////////////////AÑADE U OCULTA MARCADOR SECUNDARIO Y LINEA AL MAPA PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Función que determina si debe añadir u ocultar el marcador amarillo al hacer clic en un marcador naranja
 */
function anadirMarcadoresSecundarios(e){
	let uri = e.target.options.uri;
	let marcadoresURI2 = findMarcadoresByUriFalse(uri);
	let marcadoresURI = findMarcadoresByUri(uri);

	for (let j = 0; j < marcadoresURI2.length; j++) {
		let punto = marcadoresURI2[j];
		let popup = punto.getPopup().getContent();
		let latlng = punto.getLatLng();
		let existeMarcador = existeMarcadorEnPosicion(latlng.lat, latlng.lng);

		if (!existeMarcador) {
			let marcadorYellow = marcadoresURI2[j];
			marcadorYellow.setIcon(L.icon({
				iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			}));
			marcadores2.push(marcadorYellow);
			crearLinea(marcadoresURI[j], marcadoresURI2[j]);
			if (markers.hasLayer(marcadoresURI2[j])) {
				markers.getVisibleParent(marcadoresURI2[j]).spiderfy();
			}
		} else {

			let marcadorEliminado = marcadoresURI2[j];

			//comprobamos si existe la linea o no
			if (polylineLayer.options.color === 'orange'){
				// hacemos invisible la línea
				polylineLayer.setStyle({ color: 'transparent' });
				const markerHtmlStyles = `
                background-color: #FF0000;
                width: 2rem;
                height: 2rem;
                display: block;
                left: -1.5rem;
                top: -1.5rem;
                position: relative;
                border-radius: 3rem 3rem 0;
                transform: rotate(45deg);
                border: 1px solid #FFFFFF`;
				const labelMarkerStyle = `
                color:white;
                transform: rotate(-45deg);
                width: 2rem;
                height: 2rem;
                text-align: center;
                font-size: 0.75rem;
                padding-top: 5px;
                font-weight: bold;
                `;
				const newIcon = L.divIcon({
					className: "leaf-transparent",
					iconAnchor: [-8, 16],
					labelAnchor: [-6, 0],
					popupAnchor: [0, -36],
					html: `<span style="${markerHtmlStyles}"><p style="${labelMarkerStyle}">7</p></span>`,
				});
				// cambiar el icono del marcador
				marcadorEliminado.setIcon(newIcon);
			} else {
				crearLinea(marcadoresURI[j], marcadorEliminado);
				let marcadorYellow = marcadoresURI2[j];
				marcadorYellow.setIcon(L.icon({
					iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
					shadowSize: [41, 41]
				}));
				marcadores2.push(marcadorYellow);
			}

		}
	}
}

//////////////////////////////////BUCAMOS SI EXISTE YA EL MARCADOR SECUNDARIO PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/*
 * Busca si existe un marcador en las coordenadas indicadas.
 */
function existeMarcadorEnPosicion(lat, lng){
	let encontrado = false;
	for (let i = 0; i < marcadores2.length; i++) {
		let marker = marcadores2[i];
		if (marker.getLatLng().lat === lat && marker.getLatLng().lng === lng) {
			encontrado = true;
			break;
		}
	}
	return encontrado;
}

/////////////////////////////CREA LÍNEA ENTRE MARCADOR PRINCIPAL Y SECUNDARIO PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/*
 * Funcion que crea una linea entre los objetos con multiples localizaciones
 */
function crearLinea(marcador1, marcador2){
	const latlngs = [
		[marcador1.getLatLng().lat, marcador1.getLatLng().lng],
		[marcador2.getLatLng().lat, marcador2.getLatLng().lng],
	];

	polylineLayer = L.polyline(latlngs, { color: 'orange' }).addTo(map);
}

///////////////////////////CREA MAPA DE CALOR EN LA LOCALIZACIÓN DE MARCADOR SECUNDARIO PARA TÉCNICA 2:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/*
 * Funcion que crea un mapa de calor 
 */
let heatmapLayerList = [];
let buttonList=[];
function anadirMapaCalor(event){
	
	// Se obtiene la URI del marcador naranja sobre el que se ha hecho clic
	const uri = event.target.options.uri;

	// Se buscan los marcadores que tengan la misma URI que el marcador naranja
	const marcadoresURI = findMarcadoresByUriFalse(uri);

	// Se crea un array con las coordenadas de los marcadores encontrados
	const coords = marcadoresURI.map(marcador => [marcador.getLatLng().lat, marcador.getLatLng().lng]);

	// Se crea el mapa de calor con el array de coordenadas
	heatmapLayer = L.heatLayer(coords, {
		radius: 50,
		blur: 20,
		minOpacity: 0.5,
		gradient: { 0.1: '#f44336', 0.2: '#ff9800', 0.4: '#ffc107', 0.6: '#8bc34a', 0.8: '#03a9f4', 1: '#9c27b0' }
	}, {
		maxZoom: 18,
		minZoom: 5,
		pane: 'overlayPane'
	}).addTo(map);
	// Se añade la nueva instancia de heatmapLayer a la lista
    heatmapLayerList.push(heatmapLayer);

	// Se obtiene el contenido de la etiqueta del primer marcador
	const popupContent = marcadoresURI[0].options.popupContent;

	// Se crea la etiqueta para el mapa de calor
	const etiqueta = L.popup()
		.setLatLng(coords[0]) // Las coordenadas de la etiqueta son las del primer marcador
		.setContent(popupContent);

	// Se agrega la etiqueta al mapa de calor
	etiqueta.addTo(map);

	// Se hace que la etiqueta aparezca automáticamente
	etiqueta.openPopup();


	// Se añade un botón para eliminar el mapa de calor
	button = L.control({ position: 'topleft' });
	button.onAdd = function() {
		const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
		div.innerHTML = '<button onclick="removeHeatmap()">Eliminar mapa de calor</button>';
		return div;
	};
	button.addTo(map);
	buttonList.push(button);
}
//////////////////////////////////ELIMINA MAPA DE CALOR PARA TÉCNICA 2:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

//Función para eliminar el mapa de calor y el botón
function removeHeatmap(){
    // Se elimina la última instancia de heatmapLayer en la lista
    const heatmapLayer = heatmapLayerList.pop();
    map.removeLayer(heatmapLayer);
    const button = buttonList.pop();
    map.removeControl(button);
}
