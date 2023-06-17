
//////////////////////////////////////////////////////BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES////////////////////////////////////////////////////////////////////////////////////////////////////
//BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES

function loadJSONAndAddMarkers4(map, total) {
	//L.Icon.Default.prototype.options.className = 'transparent-marker';
	markers.clearLayers();
	sinClusters.clearLayers();
	Generico.clearLayers();
	Abstracto.clearLayers();
	Preciso.clearLayers();
	Concreto.clearLayers();
	Especifico.clearLayers();
	if(Object.keys(heatmapLayerList).length !== 0){
	removeHeatmap();
	}
	if(polylineLayer && Object.keys(polyLineLayerList).length !== 0){
	polylineLayer.setStyle({ color: 'transparent' });
	}
	fetch('JSON/salidaYO.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();
			// Agregue la leyenda al mapa
			legend3.addTo(map);
			document.querySelector('.leyenda3').style.display = 'flex';
			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda3').style.display = 'none';
			});
			let numeroMarcadores=0;
			// Carga los marcadores de salida3
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
						.addTo(sinClusters)
				}
				numeroMarcadores ++;
				}else{
					break;
				}
			}
			//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES
			// Se recorre el Set de URI
			for (let i of loadedURIs.values()) {
				let uri = i;
				let uriCount = 0;
				let markerWithUri;
				sinClusters.eachLayer(function(layer) {
					const layerUri = layer.options.uri;
					if (layerUri === uri) {
						uriCount++;
						markerWithUri = layer;
					}
				});
				if (uriCount >= 1) {
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
					marcadorOrange.on('click', anadirMapaCalor);

				}
			}

		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}

///////////////////////////CALCULA PUNTO MEDIO PARA TÉCNICA 2:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////


function calculateMidpoint(coord1, coord2) {
  var lat1 = coord1[0];
  var lng1 = coord1[1];
  var lat2 = coord2[0];
  var lng2 = coord2[1];

  var midpointLat = (lat1 + lat2) / 2;
  var midpointLng = (lng1 + lng2) / 2;

  return [midpointLat, midpointLng];
}
///////////////////////////CREA MAPA DE CALOR EN LA LOCALIZACIÓN DE MARCADOR SECUNDARIO PARA TÉCNICA 2:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////


function anadirMapaCalor(event){
	// Se obtiene la URI del marcador naranja sobre el que se ha hecho clic
	const uri = event.target.options.uri;
	// Se buscan los marcadores que tengan la misma URI que el marcador naranja
	const marcadoresURI = findMarcadoresByUriFalse(uri);
	const marcadoresURI2 = findMarcadoresByUri(uri);
	// Se crea un array con las coordenadas de los marcadores encontrados
	const coords = marcadoresURI.map(marcador => [marcador.getLatLng().lat, marcador.getLatLng().lng]);
	const coords2=marcadoresURI2.map(marcador => [marcador.getLatLng().lat, marcador.getLatLng().lng]);
	var data = {
	  data: []
	};
	// Agregar las coordenadas de los marcadores al objeto data
	for (var i = 0; i < coords.length; i++) {
	  data.data.push({ lat: coords[i][0], lng: coords[i][1], count: 4 });
	}
	// Agregar las coordenadas de los marcadores2 al objeto data
	for (var i = 0; i < coords2.length; i++) {
	  data.data.push({ lat: coords2[i][0], lng: coords2[i][1], count: 3 });
	}
	var interpolatedPoints = [];
	if(coords[0][1]>40){
		var numInterpolatedPoints = 60;
			map.on('zoomend', function() {
			var zoomLevel = map.getZoom();
			console.log(zoomLevel);	        
		});
		if(numInterpolatedPoints=60){
			zoomLevel=4;
			map.setZoom(zoomLevel);
		}
	}
	else{
		var numInterpolatedPoints = 10;
	}
	for (var i = 0; i < numInterpolatedPoints; i++) {
	  var t = i / (numInterpolatedPoints - 1);
	  var lat = coords[0][0] * (1 - t) + coords2[0][0] * t;
	  var lng = coords[0][1] * (1 - t) + coords2[0][1] * t;
	  interpolatedPoints.push([lat, lng]);
	}
	interpolatedPoints.forEach(coordinates => {
	  data.data.push({ lat: coordinates[0], lng: coordinates[1], count: 1 });
	});
	
	if(heatmapLayerList.length === 0){
	  // Si no existe, crear una nueva capa de mapa de calor y almacenarla en la variable global
		  heatmapLayer = new HeatmapOverlay({
		    radius: 2,
		    maxOpacity: 0.8,
		    scaleRadius: true,
		    useLocalExtrema: true,
		    latField: 'lat',
		    lngField: 'lng',
		    valueField: 'count'
		  }).addTo(map);
	  }else {
		  // Si ya existe un heatmapLayer anterior, eliminarlo antes de crear uno nuevo
		  const previousHeatmapLayer = heatmapLayerList.pop();
		  map.removeLayer(previousHeatmapLayer);
		
		  const previousButton = buttonList.pop();
		  map.removeControl(previousButton);
		
		  heatmapLayer = new HeatmapOverlay({
		    radius: 2,
		    maxOpacity: 0.8,
		    scaleRadius: true,
		    useLocalExtrema: true,
		    latField: 'lat',
		    lngField: 'lng',
		    valueField: 'count'
		  }).addTo(map);
	  }
      heatmapLayer.setData(data);
      heatmapLayerList.push(heatmapLayer);
		// Se añade un botón para eliminar el mapa de calor
		button = L.control({ position: 'topleft' });
		button.onAdd = function() {
		const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
		div.innerHTML = '<button  onclick="removeHeatmap()">Eliminar mapa de calor</button>';
		return div;
		};
		button.addTo(map);
		buttonList.push(button);
}
