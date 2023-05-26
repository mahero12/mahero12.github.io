let marcadores2 = [];
let polylineLayer;
var heatmapLayer;
let heatmapLayer2;
let button;
let contador;
let heatmapLayerList = [];
let buttonList=[];
let polyLineLayerList=[];
let listaEtiquetas=[];

////////////////////////////////////////////////////////BOTÓN 0//SIN TÉCNICAS/////////////////////////////////////////////////////////////////////////////

function loadJSONAndAddMarkers0(map,total){
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	alert('Aquí podrá ver todos los marcadores sin ninguna técnica');
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
	removeHeatmap();
	}
	if(polylineLayer && Object.keys(polyLineLayerList).length !== 0){
	polylineLayer.setStyle({ color: 'transparent' });
	}
	fetch('JSON/salida10000.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();
			let numeroMarcadores=0;
			
			// Carga los marcadores de salida3
			for (let item in data.results.bindings) {
				if(numeroMarcadores<total){
					
                let punto = data.results.bindings[item];
                const valorUri = punto.object.value;
                const lat = punto.lat.value;
                const lng = punto.long.value;
                const label = punto.objectlabel.value;
                const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
                const marker = L.marker([lat, lng], {
                        uri: valorUri,
                    })
                    .bindPopup(popupContent)
                    .addTo(markers)
                loadedURIs.add(valorUri);
                numeroMarcadores ++;
				}else{
					break;
				}
			}
	})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}






///////////////////////////////////////////////////////////FUNCIONES NECESARIAS//////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////DEFINIMOS UN COLOR DISTINTO PARA LOS MARCADORES CON LA MISMA URI PARA TÉCNICA 2:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

const colors = ['orange', 'green', 'red', 'yellow','black','violet']; // Colores disponibles para los marcadores
let currentIndex = 0; // Índice del color actual

function generateMarkerColor() {
  const color = colors[currentIndex]; // Obtener el color actual

  // Incrementar el índice y asegurarse de que permanezca dentro del rango de colores disponibles
  currentIndex = (currentIndex + 1) % colors.length;

  return color;
}

//////////////////////////////////BUCAMOS MARCADORES PRINCIPALES PARA TÉCNICAS:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Funcion para buscar los marcadores que contienen la URI indicada, aparecen mas de una vez y son la principal.
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
	
	polyLineLayerList.push(polylineLayer);
	
}
/////////////////////////////ELIMINAR LÍNEA ENTRE MARCADOR PRINCIPAL Y SECUNDARIO PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

//Función para eliminar el mapa de calor y el botón
function eliminarLinea(){
	const polyLineLayer = polyLineLayerList.pop();
    map.removeLayer(polyLineLayer);
    
    
}



//////////////////////////////////////////////////////TÉCNICAS Y FUNCIONES ANTIGUAS/////////////////////////////////////////////////////////////////

//BOTÓN 1//SOLUCIÓN 1 A DIFERENTE NIVEL DE GRANULARIDAD// ETIQUETAS COLORES
/*function loadJSONAndAddMarkers1(map,total){
	markers.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
	removeHeatmap();
	}
	if(polylineLayer && Object.keys(polyLineLayerList).length !== 0){
	polylineLayer.setStyle({ color: 'transparent' });
	}
	fetch('JSON/salida10000.json')
		.then(response => response.json())
		.then(data => {
			const loadedURIs = new Set();
			// Agregue la leyenda al mapa
			alert('Para saber la categoría de cada elemento, haz clic en su marcador');
			legend.addTo(map);
			document.querySelector('.leyenda').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda').style.display = 'none';
			});
			let numeroMarcadores=0;
			for (let item in data.results.bindings) {
				if(numeroMarcadores<total){
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
				numeroMarcadores ++;
				}else{
					break;
				}
			}
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
*/


//////////////////////////DEFINIMOS EL COLOR DE LA ETIQUETA SEGÚN SU CATEGORÍA PARA TÉCNICA 1:NIVEL DE GRANULARIDAD//////////////////////////////////////////////////////////////////////////////////////////
/**
 * Consulta el servicio a partir de un marker y cambia el color de fondo y texto del popup en función de la clase
 */
/*
function consultarClase(e) {
	let marker = e.target;
	let id = marker.options.id;
	let clase = getClassByPlace(id);
	let fondo = 'violet'; // establecer una clase por defecto si no se encuentra una clase adecuada en las condiciones siguientes

	if (clase) {
		switch (clase) { // usar una sentencia switch para evaluar el valor de valorPlace
			case 'P': fondo = 'green'; break;
			case 'A': fondo = 'red'; break;
			case 'V': fondo = 'orange'; break;
			case 'T': fondo = 'yellow'; break;
			case 'L': fondo = 'violey'; break;
			case 'R': fondo = 'white'; break;
			case 'S': fondo = 'black'; break;
			case 'H': fondo = 'blue'; break;
		}
	}

	let popup = marker.getPopup();
	let estiloPopup = popup.getElement().children[0].style;
	estiloPopup.background = fondo;
	estiloPopup.color = getColorLetraByFondo(fondo);
}
*/
//////////////////////////////////DEFINIMOS COLOR DEL TEXTO DE ETIQUETAS PARA TÉCNICA 1:NIVEL DE GRANULARIDAD//////////////////////////////////////////////////////////////////////////////////////////


/**
 * Obtiene el color del texto en función del color del fondo. Por defecto la letra es negra
 */
/*
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
*/

//BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES
/*
function loadJSONAndAddMarkers4(map,total) {
	//L.Icon.Default.prototype.options.className = 'transparent-marker';
	markers.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
	removeHeatmap();
	}
	if(polylineLayer && Object.keys(polyLineLayerList).length !== 0){
	polylineLayer.setStyle({ color: 'transparent' });
	}
	fetch('JSON/salida10000.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();
			// Carga los marcadores de salida3
			// Agregue la leyenda al mapa
			alert('Los elementos con el mismo color son el mismo objeto en distintas localizaciones a excepción de los marcadores azules que son los que no tienen múltiples localizaciones');
			let numeroMarcadores=0;
			for (let item in data.results.bindings) {
				if(numeroMarcadores<total){
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
					const marker = L.marker([lat, lng], {
						uri: valorUri,
						principal: false,
						placename: placename,
						popupContent: popupContent
					})
						.bindPopup(popupContent)
						.addTo(markers);
					// agrega la uri actual a loadedURIs
					loadedURIs.add(valorUri);
				}
			numeroMarcadores ++;
			}else{
				break;
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
				//no tienen multiples localizaciones
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
				//si tienen multiples localizaciones
				if (uriCount >= 2) {
					let markerColor=generateMarkerColor();
					let marcadoresURI = findMarcadoresByUri(uri);
					for (let j = 0; j < marcadoresURI.length; j++) {
						
						let marcadorPrincipal = marcadoresURI[j];
	
						marcadorPrincipal.setIcon(L.icon({
							iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
							shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
						}));
					}
					let marcadoresURI2 = findMarcadoresByUriFalse(uri);
					for (let j = 0; j < marcadoresURI2.length; j++) {
						let marcadorSecundario = marcadoresURI2[j];
						
						marcadorSecundario.setIcon(L.icon({
							iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
							shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
						}));
					}
				}
			}

		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
*/

