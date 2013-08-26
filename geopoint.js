 /**
  * Represents a point on the surface of a sphere (e.g. Earth)
  *
  * This is a JavaScript port of the code originally published at
  * http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates#Java
  * 
  * @author Jan Philip Matuschek
  * @version 22 September 2010
  */
(function () {

  var toString = Object.prototype.toString,
      DEG2RAD = Math.PI / 180, // degrees to radian conversion
      RAD2DEG = 180 / Math.PI, // radians to degrees conversion
      MI2KM = 1.6093439999999999, // miles to kilometers conversion
      KM2MI = 0.621371192237334, // kilometers to miles conversion
      EARTH_RADIUS_KM = 6371.01, // Earth's radius in km
      EARTH_RADIUS_MI = 3958.762079, // Earth's radius in miles
      MAX_LAT = Math.PI / 2, // 90 degrees
      MIN_LAT = -MAX_LAT, // -90 degrees
      MAX_LON = Math.PI, // 180 degrees
      MIN_LON = -MAX_LON; // -180 degrees

  /**
   * Check if an object is a valid number
   *
   * @param   {Number}    value   Value to check
   * @return  {Boolean}   true if a number and not NaN
   */
  function isNumber(value) {
    return toString.call(value) === '[object Number]' && value === +value;
  }

  /**
   * Constructor
   *
   * @param   {Number}    lat         Latitude
   * @param   {Number}    long        Longitude
   * @param   {Boolean}   inRadians   true if latitude and longitude are in radians
   */
  function GeoPoint(lat, lon, inRadians) {
    if (!isNumber(lat)) {
      throw new Error('Invalid latitude');
    }
    if (!isNumber(lon)) {
      throw new Error('Invalid longitude');
    }
    if (inRadians === true) {
      this._degLat = GeoPoint.radiansToDegrees(lat);
      this._degLon = GeoPoint.radiansToDegrees(lon);
      this._radLat = lat;
      this._radLon = lon;
    } else {
      this._degLat = lat;
      this._degLon = lon;
      this._radLat = GeoPoint.degreesToRadians(lat);
      this._radLon = GeoPoint.degreesToRadians(lon);
    }
    if (this._radLat < MIN_LAT || this._radLat > MAX_LAT) {
      throw new Error('Latitude out of bounds');
    } else if (this._radLon < MIN_LON || this._radLon > MAX_LON) {
      throw new Error('Longitude out of bounds');
    }
  }

  /**
   * Return the latitude
   *
   * @param   {Boolean}   inRadians   true to return the latitude in radians
   * @param   {Number}    latitude
   */
  GeoPoint.prototype.latitude = function(inRadians) {
    if (inRadians === true) {
      return this._radLat;
    }
    return this._degLat;
  };

  /**
   * Return the longitude
   *
   * @param   {Boolean}   inRadians   true to return the longitude in radians
   * @param   {Number}    longitude
   */
  GeoPoint.prototype.longitude = function(inRadians) {
    if (inRadians === true) {
      return this._radLon;
    }
    return this._degLon;
  };

  /**
   * Calculates the distance between two points
   *
   * @param   {Object}    point         GeoPoint instance
   * @param   {Boolean}   inKilometers  true to return the distance in kilometers
   * @return  {Number}    distance between points
   */
  GeoPoint.prototype.distanceTo = function(point, inKilometers) {
    if (!(point instanceof GeoPoint)) {
      throw new Error('Invalid GeoPoint');
    }
    var radius = inKilometers === true ? EARTH_RADIUS_KM : EARTH_RADIUS_MI,
        lat1 = this.latitude(true),
        lat2 = point.latitude(true),
        lon1 = this.longitude(true),
        lon2 = point.longitude(true);
    return Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.cos(lon1 - lon2)) * radius;
  };

  /**
   * Convert degrees to radians
   *
   * @param   {Number}    value   degree value
   * @return  {Number}    radian value
   */
  GeoPoint.degreesToRadians = function(value) {
    if (!isNumber(value)) {
      throw new Error('Invalid degree value');
    }
    return value * DEG2RAD;
  };

  /**
   * Convert radians to degrees
   *
   * @param   {Number}    value   radian value
   * @return  {Number}    degree value
   */
  GeoPoint.radiansToDegrees = function(value) {
    if (!isNumber(value)) {
      throw new Error('Invalid radian value');
    }
    return value * RAD2DEG;
  };

  /**
   * Cnvert miles to kilometers
   *
   * @param   {Number}    value   miles value
   * @return  {Number}    kilometers value
   */
  GeoPoint.milesToKilometers = function(value) {
    if (!isNumber(value)) {
      throw new Error('Invalid mile value');
    }
    return value * MI2KM;
  };

  /**
   * Convert kilometers to miles
   *
   * @param   {Number}    value   kilometer value
   * @return  {Number}    miles value
   */
  GeoPoint.kilometersToMiles = function(value) {
    if (!isNumber(value)) {
      throw new Error('Invalid kilometer value');
    }
    return value * KM2MI;
  };

  // Export
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = GeoPoint;
  } else {
    this.GeoPoint = GeoPoint;
  }

}).call(this);
