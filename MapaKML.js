//AIzaSyC8aUp4J8B-MOmk6mg4A8cSsbE3qzEpB1g

class MapaDinamico{

  initMap(){
      this.map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(43.362407 , -6.159651),
      zoom: 10,
      mapTypeId: 'terrain'
    });
  }

  /**
   * Pinta las rutas sobre el mapa usando la clase PolyLine
   */
  initDrawing(){

    var puntos = []; //Crea un array de elementos LatLng
    //Formato coordenada kml es (lng,lat,altitud): -6.069794,43.389283,55 
    this.ruta.forEach(punto => {
      var items = punto.split(","); //Se divide el string en un array de 3 elementos
      puntos.push(new google.maps.LatLng(items[1].trim(), items[0].trim())) //Cogemos el primer y segundo elemento que corresponden a longitud y latitud respectivamente
    });
    
    var polyLinea = new google.maps.Polyline({
      path: puntos,
      map: this.map,
      strokeColor: 'ff0000ff',
      strokeWeight: 4,
  });
  }

  /**
   * Recorre las coordenadas de las rutas mediante un 
   * selector de jQuery
   * 
   * @param {File} archivo en formato KML para ser procesado
   */
  procesaKML(archivo){
    this.ruta = $('Placemark LineString',archivo).text().split(" "); //Almacena un array de coordenadas
    this.initDrawing();
  }

  /**
   * Carga el archivo desde la máquina de cliente
   * Lee su contenido y lo envía como parámetro al 
   * método procesaKML
   * 
   * @param {*} files 
   */
  leerArchivoKML(files){ 
    var archivo = files[0];
    var lector = new FileReader();
    lector.onload = function (evento) {
      this.procesaKML(lector.result);
    }.bind(this);
    lector.readAsText(archivo);
  }
}

var mapaDinamicoGoogle = new MapaDinamico();