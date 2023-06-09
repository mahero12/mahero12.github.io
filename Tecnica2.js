
//////////////////////////////////////////////BOTÓN 2//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////
function loadJSONAndAddMarkers2(map, total){
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
			legend4.addTo(map);
			document.querySelector('.leyenda1').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda1').style.display = 'none';
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
				//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD
				// Determina el color del marcador según si la etiqueta contiene una coma o no
				switch (clase) {
						 // usar una sentencia switch para evaluar el valor de valorPlace
						case  'P': 
								contador ++; switch (code) {
								    case 'PPLA':
								      // Verde más oscuro
								       const markerVerdeOscuro = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">40%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentVerdeOscuro = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerVOscuro = L.marker([lat, lng], {
									icon: markerVerdeOscuro,
									uri: valorUri,
								})
									.bindPopup(popupContentVerdeOscuro)
									.addTo(Preciso);
								loadedURIs.add(valorUri);
								      break;
								    case 'PPLA3':
								      // Verde 
								     const markerVerde = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">50%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentVerde = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerV = L.marker([lat, lng], {
									icon: markerVerde,
									uri: valorUri,
								})
									.bindPopup(popupContentVerde)
									.addTo(Preciso);
								loadedURIs.add(valorUri);
								      break;
								    case 'PPLA2':
								      // Verde más claro
								     const markerVerdeClaro = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">60%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentVerdeClaro = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerVClaro = L.marker([lat, lng], {
									icon: markerVerdeClaro,
									uri: valorUri,
								})
									.bindPopup(popupContentVerdeClaro)
									.addTo(Preciso);
								loadedURIs.add(valorUri);
								     break;
								    default:
								      // Rojo predeterminado
								      const markerVerdeDefault = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">50%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentVerdeDefault = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerVDefault = L.marker([lat, lng], {
									icon: markerVerdeDefault,
									uri: valorUri,
								})
									.bindPopup(popupContentVerdeDefault)
									.addTo(Preciso);
								loadedURIs.add(valorUri);
								      break;
								  }
								
								break;
						case 'A':
								contador ++;switch (code) {
								    case 'ADM3':
								      // Rojo más oscuro
								       const markerRojoOscuro =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">30%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentRojoOscuro = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerROscuro = L.marker([lat, lng], {
									icon: markerRojoOscuro,
									uri: valorUri,
								})
									.bindPopup(popupContentRojoOscuro)
									.addTo(Abstracto);
								loadedURIs.add(valorUri);
								      break;
								    case 'PCLI':
								      // Rojo 
								      const markerRojoClaro =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">20%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentRojoClaro = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerRCLaro = L.marker([lat, lng], {
									icon: markerRojoClaro,
									uri: valorUri,
								})
									.bindPopup(popupContentRojoClaro)
									.addTo(Abstracto);
								loadedURIs.add(valorUri);
								      break;
								    default:
								      // Rojo predeterminado
								      const markerRojoDefault =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">30%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentRojoDefault = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerRDefault = L.marker([lat, lng], {
									icon: markerRojoDefault,
									uri: valorUri,
								})
									.bindPopup(popupContentRojoDefault )
									.addTo(Abstracto);
								loadedURIs.add(valorUri);
								      break;
								  }
								
							break;
						case 'V': 
								contador ++;
								const markerIconV =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">70%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentV = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerV = L.marker([lat, lng], {
									icon: markerIconV,
									uri: valorUri,
								})
									.bindPopup(popupContentV)
									.addTo(markers);
								loadedURIs.add(valorUri);
							break;
						case 'T':
								contador ++;
								const markerIconT = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">70%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentT = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerT = L.marker([lat, lng], {
									icon: markerIconT,
									uri: valorUri,
								})
									.bindPopup(popupContentT)
									.addTo(markers);
								loadedURIs.add(valorUri);
							break;
						case 'L':
								contador ++;
								switch (code) {
								    case 'PRK':
								      // Violeta más oscuro
								     const markerVioletaOscuro =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">80%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentVioletaOscuro = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerViOscuro = L.marker([lat, lng], {
									icon: markerVioletaOscuro,
									uri: valorUri,
								})
									.bindPopup(popupContentVioletaOscuro)
									.addTo(Especifico);
								loadedURIs.add(valorUri);
								      break;
								    case 'RGN':
								      // Violeta más claro
								       const markerVioletaClaro=  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">90%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentVioletaClaro = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerViClaro = L.marker([lat, lng], {
									icon: markerVioletaClaro,
									uri: valorUri,
								})
									.bindPopup(popupContentVioletaClaro)
									.addTo(Especifico);
								loadedURIs.add(valorUri);
								      break;
								    default:
								  // Violeta predeterminado
								      const markerVioletaDefault =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">90%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentVioletaDefault = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerViDefault = L.marker([lat, lng], {
									icon: markerVioletaDefault,
									uri: valorUri,
								})
									.bindPopup(popupContentVioletaDefault)
									.addTo(Especifico);
								loadedURIs.add(valorUri);
								      break;
								  }
								
							 break;
						case 'R':
								contador ++;
								const markerIconR =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">100%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentR = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerR = L.marker([lat, lng], {
									icon: markerIconR,
									uri: valorUri,
								})
									.bindPopup(popupContentR)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;
						case 'S': 
								contador ++;
								const markerIconS =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">100%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentS = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerS = L.marker([lat, lng], {
									icon: markerIconS,
									uri: valorUri,
								})
									.bindPopup(popupContentS)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;
						case 'H':
								contador ++;
								const markerIconH = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">10%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentH = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerH = L.marker([lat, lng], {
									icon: markerIconH,
									uri: valorUri,
								})
									.bindPopup(popupContentH)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;	
				}
				numeroMarcadores ++;
				}else{
					break;
				}
			}
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
