var clusterclickRealizado;
marcadores2=[];
//////////////////////////////////////////////////////BOTÓN 3//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES////////////////////////////////////////////////////////////////////////////////////////////////////
//BOTÓN 3//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES
function loadJSONAndAddMarkers3(map, total) {
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
	fetch('JSON/salida10000.json')
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
					
					 clusterclickRealizado = false;

					markers.on('clusterclick', function (event) {
					  var cluster = event.layer;
					  clusterclickRealizado = true;
					});
					
					marcadorOrange.on('click', function() {
					  if (clusterclickRealizado) {
					    // Se ha realizado un evento clusterclick
					    anadirMarcadoresSecundariosCluster(marcadorOrange.options.uri);
					  } else {
					    // No se ha realizado un evento clusterclick
					    anadirMarcadoresSecundarios(marcadorOrange.options.uri);
					    
					  }
					});

				}
			}

		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}

//////////////////////////////AÑADE U OCULTA MARCADOR SECUNDARIO Y LINEA AL MAPA PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Función que determina si debe añadir u ocultar el marcador amarillo al hacer clic en un marcador naranja
 */


function anadirMarcadoresSecundarios(uri){
	console.log('ha entrado en primera')
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


	if (marcadores2.length !== 0) {
	  for (let i = 0; i < marcadores2.length; i++) {
	    const marcador = marcadores2[i];
	    marcador.setIcon(customIconLabel);
	  }
	
	if (!markers.hasLayer(marcadorPrincipal) && map.hasLayer(marcadorPrincipal)) {
					  // Agregar el marcador al clúster
					  markers.addLayer(marcadorPrincipal);
					  // Eliminar el marcador del mapa
					  map.removeLayer(marcadorPrincipal);
	}
}

	let marcadoresURI2 = findMarcadoresByUriFalse(uri);
	let marcadoresURI = findMarcadoresByUri(uri);
	
	for (let j = 0; j < marcadoresURI2.length; j++) {
		let punto = marcadoresURI2[j];
		let popup = punto.getPopup().getContent();
		let latlng = punto.getLatLng();
		let existeMarcador = existeMarcadorEnPosicion(latlng.lat, latlng.lng);
		marcadorSecundario=marcadoresURI2[j];
		marcadorPrincipal=marcadoresURI[j];
		clusterSecundario= markers.getVisibleParent(marcadoresURI2[j]);
		clusterPrimario= markers.getVisibleParent(marcadoresURI[j]);
		//si no exite el marcador secundario
		if (!existeMarcador) {
			//abre el cluster del marcador del secundario
			

			if (markers.hasLayer(marcadoresURI[j]) && !map.hasLayer(marcadoresURI2[j])) {
			  // Eliminar el marcador del clúster
			  markers.removeLayer(marcadoresURI[j]);
			  // Agregar el marcador directamente al mapa
			  marcadoresURI[j].addTo(map);
			}
			
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
		//si existe
		} else {
			let marcadorEliminado = marcadoresURI2[j];
			//comprobamos si existe la linea 
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
		
				// Si no hay cluster
				
				if (!markers.hasLayer(marcadoresURI[j]) && map.hasLayer(marcadoresURI[j])) {
				  // Agregar el marcador al clúster
				  markers.addLayer(marcadoresURI[j]);
				  // Eliminar el marcador del mapa
				  map.removeLayer(marcadoresURI[j]);
				}

			} else {
				// Verificar si el marcador pertenece a un clúster
				
				if (markers.hasLayer(marcadoresURI[j]) && !map.hasLayer(marcadoresURI2[j])) {
				  // Eliminar el marcador del clúster
				  markers.removeLayer(marcadoresURI[j]);
				  // Agregar el marcador directamente al mapa
				  marcadoresURI[j].addTo(map);
				}

				crearLinea(marcadoresURI[j], marcadoresURI2[j]);
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
		map.on('click', function () {
		  // Realizar las acciones necesarias cuando se hace clic en cualquier parte del mapa
		  // Restablecer el estilo de la capa de polilínea
		  polylineLayer.setStyle({ color: 'transparent' });
		  //quitar marcador secundario 
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
				marcadorSecundario.setIcon(newIcon);
				
				if (!markers.hasLayer(marcadorPrincipal) && map.hasLayer(marcadoresURI[j])) {
				  // Agregar el marcador al clúster
				  markers.addLayer(marcadorPrincipal);
				  // Eliminar el marcador del mapa
				  map.removeLayer(marcadorPrincipal);
				}
		});
	}
}

function anadirMarcadoresSecundariosCluster(uri){
	console.log('ha entrado en segunda')
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


	if (marcadores2.length !== 0) {
	  for (let i = 0; i < marcadores2.length; i++) {
	    const marcador = marcadores2[i];
	    marcador.setIcon(customIconLabel);
	  }
	
	
}
	let marcadoresURI2 = findMarcadoresByUriFalse(uri);
	let marcadoresURI = findMarcadoresByUri(uri);
	clusterclickRealizado=false;
	for (let j = 0; j < marcadoresURI2.length; j++) {
		let punto = marcadoresURI2[j];
		let popup = punto.getPopup().getContent();
		let latlng = punto.getLatLng();
		let existeMarcador = existeMarcadorEnPosicion(latlng.lat, latlng.lng);
		marcadorSecundario=marcadoresURI2[j];
		marcadorPrincipal=marcadoresURI[j];
		clusterSecundario= markers.getVisibleParent(marcadoresURI2[j]);
		clusterPrimario= markers.getVisibleParent(marcadoresURI[j]);
		//si no exite el marcador secundario
		if (!existeMarcador) {
			
			if (markers.hasLayer(marcadoresURI[j]) && map.hasLayer(marcadoresURI2[j])) {
			  // Eliminar el marcador del clúster
			  markers.removeLayer(marcadoresURI[j]);
			  // Agregar el marcador directamente al mapa
			  marcadoresURI[j].addTo(map);
			}
			
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
		//si existe
		} else {
			let marcadorEliminado = marcadoresURI2[j];
			//comprobamos si existe la linea 
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
		
				if (!markers.hasLayer(marcadoresURI[j]) && map.hasLayer(marcadoresURI[j])) {
				  // Agregar el marcador al clúster
				  markers.addLayer(marcadoresURI[j]);
				  // Eliminar el marcador del mapa
				  map.removeLayer(marcadoresURI[j]);
				}

			} else {
				
				if (markers.hasLayer(marcadoresURI[j]) && map.hasLayer(marcadoresURI2[j])) {
				  // Eliminar el marcador del clúster
				  markers.removeLayer(marcadoresURI[j]);
				  // Agregar el marcador directamente al mapa
				  marcadoresURI[j].addTo(map);
				}
				crearLinea(marcadoresURI[j], marcadoresURI2[j]);
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
		map.on('click', function () {
		  // Realizar las acciones necesarias cuando se hace clic en cualquier parte del mapa
		  // Restablecer el estilo de la capa de polilínea
		  polylineLayer.setStyle({ color: 'transparent' });
		  //quitar marcador secundario 
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
				marcadorSecundario.setIcon(newIcon);
			
				if (!markers.hasLayer(marcadorPrincipal) && map.hasLayer(marcadoresURI[j])) {
				  // Agregar el marcador al clúster
				  markers.addLayer(marcadorPrincipal);
				  // Eliminar el marcador del mapa
				  map.removeLayer(marcadorPrincipal);
				  
				}
		});
		
	}
}


