var assert = require('assert'),
    GeoPoint = require('../'),
    LAT_DEG = 40.689604,
    LON_DEG = -74.04455,
    LAT_RAD = 0.7101675611326549,
    LON_RAD = -1.2923211906575673;

describe('.latitude(inRadians)', function() {

  it('should return the latitude in radians if inRadians is true', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);    
    assert.equal(point.latitude(true), LAT_RAD); 
  });

  it('should return the latitude in degrees if inRadians is false', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);    
    assert.equal(point.latitude(false), LAT_DEG); 
  });

  it('should return the latitude in degrees by default', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);    
    assert.equal(point.latitude(), LAT_DEG); 
  });

});

describe('.longitude(inRadians)', function() {

  it('should return the longitude in radians if inRadians is true', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);    
    assert.equal(point.longitude(true), LON_RAD); 
  });

  it('should return the longitude in degrees if inRadians is false', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);    
    assert.equal(point.longitude(false), LON_DEG); 
  });

  it('should return the longitude in degrees by default', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);    
    assert.equal(point.longitude(), LON_DEG); 
  });

});

