//////////////////////////////////////////////BOTÓN 1//SOLUCIÓN 1 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////

function loadJSONAndAddMarkers1(map, total){
	contador=0;
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
			legend.addTo(map);
			document.querySelector('.leyenda').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda').style.display = 'none';
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
				let valorPlace = punto.place.value;
				let clase = mapaClases.get(valorPlace.split('/')[3]);
				let code = mapaCodes.get(valorPlace.split('/')[3]);
				let popupClass = 'gray-popup'; // establecer una clase por defecto si no se encuentra una clase 
				let markerColor = 'gray';
				//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD
				// Determina el color del marcador según si la etiqueta contiene una coma o no
				switch (clase) {
						 // usar una sentencia switch para evaluar el valor de valorPlace
						case  'P': popupClass = 'green-popup';
							markerColor = 'green';
								contador ++;
								 switch (code) {
								    case 'PPLA':
								      // Verde más oscuro
								       const markerVerdeOscuro = L.icon({
									iconUrl: 'img/verdeOscuro.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentVerdeOscuro = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsVerdeOscuro = {
									className: popupClass,
								};
								const markerVOscuro = L.marker([lat, lng], {
									icon: markerVerdeOscuro,
									uri: valorUri,
								})
									.bindPopup(popupContentVerdeOscuro, popupOptionsVerdeOscuro)
									.addTo(Preciso);
								loadedURIs.add(valorUri);
								      break;
								    case 'PPLA3':
								      // Verde 
								      const markerVerde = L.icon({
									iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentVerde = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsVerde = {
									className: popupClass,
								};
								const markerV = L.marker([lat, lng], {
									icon: markerVerde,
									uri: valorUri,
								})
									.bindPopup(popupContentVerde, popupOptionsVerde)
									.addTo(Preciso);
								loadedURIs.add(valorUri);
								      break;
								    case 'PPLA2':
								      // Verde más claro
								     const markerVerdeClaro = L.icon({
									iconUrl: 'img/verdeClaro.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentVerdeClaro = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsVerdeClaro = {
									className: popupClass,
								};
								const markerVClaro = L.marker([lat, lng], {
									icon: markerVerdeClaro,
									uri: valorUri,
								})
									.bindPopup(popupContentVerdeClaro, popupOptionsVerdeClaro)
									.addTo(Preciso);
								loadedURIs.add(valorUri);
								     break;
								    default:
								      // Rojo predeterminado
								      const markerVerdeDefault = L.icon({
									iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentVerdeDefault = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsVerdeDefault = {
									className: popupClass,
								};
								const markerVDefault = L.marker([lat, lng], {
									icon: markerVerdeDefault,
									uri: valorUri,
								})
									.bindPopup(popupContentVerdeDefault, popupOptionsVerdeDefault)
									.addTo(Preciso);
								loadedURIs.add(valorUri);
								      break;
								  }
								
								break;
						case 'A': popupClass = 'red-popup';
							markerColor = 'red';
								contador ++;
								  switch (code) {
								    case 'ADM3':
								      // Rojo más oscuro
								       const markerRojoOscuro = L.icon({
									iconUrl: 'img/rojoOscuro.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentRojoOscuro  = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsRojoOscuro  = {
									className: popupClass,
								};
								const markerROscuro = L.marker([lat, lng], {
									icon: markerRojoOscuro,
									uri: valorUri,
								})
									.bindPopup(popupContentRojoOscuro , popupOptionsRojoOscuro )
									.addTo(Abstracto);
								loadedURIs.add(valorUri);
								      break;
								    case 'PCLI':
								      // Rojo 
								       const markerRojoClaro = L.icon({
									iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentRojoClaro  = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsRojoClaro  = {
									className: popupClass,
								};
								const markerRClaro  = L.marker([lat, lng], {
									icon: markerRojoClaro,
									uri: valorUri,
								})
									.bindPopup(popupContentRojoClaro , popupOptionsRojoClaro )
									.addTo(Abstracto);
								loadedURIs.add(valorUri);
								      break;
								    default:
								      // Rojo predeterminado
								      const markerRojoDefault = L.icon({
									iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentRojoDefault = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsRojoDefault = {
									className: popupClass,
								};
								const markerRDefault = L.marker([lat, lng], {
									icon: markerRojoDefault,
									uri: valorUri,
								})
									.bindPopup(popupContentRojoDefault, popupOptionsRojoDefault)
									.addTo(Abstracto);
								loadedURIs.add(valorUri);
								      break;
								  }
								
							break;
						case 'V': popupClass = 'orange-popup';
							markerColor = 'orange';
								contador ++;
								const markerIconV = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentV = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsV = {
									className: popupClass,
								};
								const markerV = L.marker([lat, lng], {
									icon: markerIconV,
									uri: valorUri,
								})
									.bindPopup(popupContentV, popupOptionsV)
									.addTo(Concreto);
								loadedURIs.add(valorUri);
							break;
						case 'T': popupClass = 'yellow-popup';
							markerColor = 'yellow';
								contador ++;
								const markerIconT = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentT = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsT = {
									className: popupClass,
								};
								const markerT = L.marker([lat, lng], {
									icon: markerIconT,
									uri: valorUri,
								})
									.bindPopup(popupContentT, popupOptionsT)
									.addTo(Concreto);
								loadedURIs.add(valorUri);
							break;
						case 'L': popupClass = 'violet-popup';
							markerColor = 'violet';
								contador ++;
								switch (code) {
								    case 'PRK':
								      // Rojo más oscuro
								      const markerVioletaOscuro = L.icon({
									iconUrl: 'img/violetaOscuro.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentVioletaOscuro = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsVioletaOscuro = {
									className: popupClass,
								};
								const markerViOscuro = L.marker([lat, lng], {
									icon: markerVioletaOscuro,
									uri: valorUri,
								})
									.bindPopup(popupContentVioletaOscuro, popupOptionsVioletaOscuro)
									.addTo(Especifico);
								loadedURIs.add(valorUri);
								      break;
								    case 'RGN':
								      // Rojo más claro
								       const markerVioletaClaro = L.icon({
									iconUrl: 'img/violetaClaro.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentVioletaClaro = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsVioletaClaro = {
									className: popupClass,
								};
								const markerViClaro = L.marker([lat, lng], {
									icon: markerVioletaClaro,
									uri: valorUri,
								})
									.bindPopup(popupContentVioletaClaro, popupOptionsVioletaClaro)
									.addTo(Especifico);
								loadedURIs.add(valorUri);
								      break;
								    default:
								  // Violeta predeterminado
								      const markerVioletaDefault = L.icon({
									iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentVioletaDefault = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsVioletaDefault = {
									className: popupClass,
								};
								const markerViDefault = L.marker([lat, lng], {
									icon: markerVioletaDefault,
									uri: valorUri,
								})
									.bindPopup(popupContentVioletaDefault, popupOptionsVioletaoDefault)
									.addTo(Especifico);
								loadedURIs.add(valorUri);
								      break;
								  }
								
							 break;
						case 'R': popupClass = 'white-popup';
							markerColor = 'white';
								contador ++;
								const markerIconR = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentR = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsR = {
									className: popupClass,
								};
								const markerR = L.marker([lat, lng], {
									icon: markerIconR,
									uri: valorUri,
								})
									.bindPopup(popupContentR, popupOptionsR)
									.addTo(Especifico);
								loadedURIs.add(valorUri);
							 break;
						case 'S': popupClass = 'black-popup';
							markerColor = 'black';
								contador ++;
								const markerIconS = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentS = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsS = {
									className: popupClass,
								};
								const markerS = L.marker([lat, lng], {
									icon: markerIconS,
									uri: valorUri,
								})
									.bindPopup(popupContentS, popupOptionsS)
									.addTo(Especifico);
								loadedURIs.add(valorUri);
							 break;
						case 'H': popupClass = 'blue-popup';
							markerColor = 'blue';
								contador ++;
								const markerIconH = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentH = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsH = {
									className: popupClass,
								};
								const markerH = L.marker([lat, lng], {
									icon: markerIconH,
									uri: valorUri,
								})
									.bindPopup(popupContentH, popupOptionsH)
									.addTo(Generico);
								loadedURIs.add(valorUri);
							 break;	
				}
				numeroMarcadores ++;
				}else{
					break;
				}
			}
			map.on('zoomend', function() {
			        var zoomLevel = map.getZoom();
			        
			        if (zoomLevel <=3) {
		        		if (map.hasLayer(Generico)) {
		        	      map.removeLayer(Generico);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Generico)) {
		        	      map.addLayer(Generico);
		        	    }
		        	  }
			        if (zoomLevel <=4) {
		        		if (map.hasLayer(Abstracto)) {
		        	      map.removeLayer(Abstracto);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Abstracto)) {
		        	      map.addLayer(Abstracto);
		        	    }
		        	  }
		        	  if (zoomLevel <=5) {
		        		if (map.hasLayer(Preciso)) {
		        	      map.removeLayer(Preciso);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Preciso)) {
		        	      map.addLayer(Preciso);
		        	    }
		        	  }
		        	  if (zoomLevel <=6) {
		        		if (map.hasLayer(Concreto)) {
		        	      map.removeLayer(Concreto);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Concreto)) {
		        	      map.addLayer(Concreto);
		        	    }
		        	  }
		        	  if (zoomLevel <=7) {
		        		if (map.hasLayer(Especifico)) {
		        	      map.removeLayer(Especifico);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Especifico)) {
		        	      map.addLayer(Especifico);
		        	    }
		        	  }
		        });
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
