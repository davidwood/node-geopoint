var assert = require('assert'),
    GeoPoint = require('../'),
    LAT_DEG = 40.689604,
    LON_DEG = -74.04455,
    LAT_RAD = 0.7101675611326549,
    LON_RAD = -1.2923211906575673;

describe('new GeoPoint(lat, lon, inRadians)', function() {

  it('should throw and error if latitude is not valid', function() {
    var error;
    try {
      new GeoPoint();
    } catch (e) {
      error = e;
    }
    assert.ok(error instanceof Error);
    assert.equal(error.message, 'Invalid latitude');
  });

  it('should throw and error if longitude is not valid', function() {
    var error;
    try {
      new GeoPoint(LAT_DEG);
    } catch (e) {
      error = e;
    }
    assert.ok(error instanceof Error);
    assert.equal(error.message, 'Invalid longitude');
  });

  it('should convert latitude and longitude in degrees to radians', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG, false);    
    assert.equal(point._radLat, LAT_RAD);
    assert.equal(point._radLon, -1.2923211906575673);
  });

  it('should convert latitude and longitude in radians to degrees', function() {
    var point = new GeoPoint(LAT_RAD, -1.2923211906575673, true);
    assert.equal(point._degLat, LAT_DEG);
    assert.equal(point._degLon, LON_DEG);
  });

  it('should default to latitude and longitude in degrees', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);    
    assert.equal(point._radLat, LAT_RAD);
    assert.equal(point._radLon, -1.2923211906575673);
  });

  it('should throw an error if the latitude is out of bounds', function() {
    var error;
    try {
      new GeoPoint(200, LON_DEG);
    } catch (e) {
      error = e;
    }
    assert.ok(error instanceof Error);
    assert.equal(error.message, 'Latitude out of bounds');
  });

  it('should throw an error if the longitude is out of bounds', function() {
    var error;
    try {
      new GeoPoint(LAT_DEG, 200);
    } catch (e) {
      error = e;
    }
    assert.ok(error instanceof Error);
    assert.equal(error.message, 'Longitude out of bounds');
  });

});
