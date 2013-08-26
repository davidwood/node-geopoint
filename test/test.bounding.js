var assert = require('assert'),
    GeoPoint = require('../'),
    LAT_DEG = 40.689604,
    LON_DEG = -74.04455,
    DISTANCE = 20,
    SW_LAT_MI = 40.40014088820039,
    SW_LON_MI = -74.42630141845927,
    SW_DIST_MI = 28.314943918527167,
    NE_LAT_MI = 40.97906711179962,
    NE_LON_MI = -73.66279858154073,
    NE_DIST_MI = 28.25351161423632,
    SW_LAT_KM = 40.50973996113307,
    SW_LON_KM = -74.28175887602288,
    SW_DIST_KM = 28.30334049313065,
    NE_LAT_KM = 40.86946803886694,
    NE_LON_KM = -73.80734112397712,
    NE_DIST_KM = 28.2651684254543,
    RADIUS_KM = 6371.01;

describe('.boundingCoordinates(distance, radius, inKilometers)', function() {

  it('should throw an error if the distance is not valid', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);
    ['foo', 0/0, void 0, -1, 0].forEach(function(value) {
      var error;
      try {
        point.boundingCoordinates(value);
      } catch (e) {
        error = e;
      }
      assert.ok(error instanceof Error);
      assert.equal(error.message, 'Invalid distance');
    });
  });

  it('should return an array containing the lower and upper points', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        coordinates = point.boundingCoordinates(DISTANCE);
    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.ok(coordinates[0] instanceof GeoPoint);
    assert.ok(coordinates[1] instanceof GeoPoint);
  });

  it('should calculate the bounding coordinates in miles if inKilometers is false', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        coordinates = point.boundingCoordinates(DISTANCE, false);
    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.equal(coordinates[0].latitude(), SW_LAT_MI);
    assert.equal(coordinates[0].longitude(), SW_LON_MI);
    assert.equal(point.distanceTo(coordinates[0], false), SW_DIST_MI);
    assert.equal(coordinates[1].latitude(), NE_LAT_MI);
    assert.equal(coordinates[1].longitude(), NE_LON_MI);
    assert.equal(point.distanceTo(coordinates[1], false), NE_DIST_MI);
  });

  it('should calculate the bounding coordinates in kilometers if inKilometers is true', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        coordinates = point.boundingCoordinates(DISTANCE, true);
    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.equal(coordinates[0].latitude(), SW_LAT_KM);
    assert.equal(coordinates[0].longitude(), SW_LON_KM);
    assert.equal(point.distanceTo(coordinates[0], true), SW_DIST_KM);
    assert.equal(coordinates[1].latitude(), NE_LAT_KM);
    assert.equal(coordinates[1].longitude(), NE_LON_KM);
    assert.equal(point.distanceTo(coordinates[1], true), NE_DIST_KM);
  });

  it('should calculate the bounding coordinates in miles by default', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        coordinates = point.boundingCoordinates(DISTANCE, false);
    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.equal(coordinates[0].latitude(), SW_LAT_MI);
    assert.equal(coordinates[0].longitude(), SW_LON_MI);
    assert.equal(point.distanceTo(coordinates[0], false), SW_DIST_MI);
    assert.equal(coordinates[1].latitude(), NE_LAT_MI);
    assert.equal(coordinates[1].longitude(), NE_LON_MI);
    assert.equal(point.distanceTo(coordinates[1], false), NE_DIST_MI);
  });

  it('should accept an optional radius', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        coordinates = point.boundingCoordinates(DISTANCE, RADIUS_KM);
    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.equal(coordinates[0].latitude(), SW_LAT_KM);
    assert.equal(coordinates[0].longitude(), SW_LON_KM);
    assert.equal(point.distanceTo(coordinates[0], true), SW_DIST_KM);
    assert.equal(coordinates[1].latitude(), NE_LAT_KM);
    assert.equal(coordinates[1].longitude(), NE_LON_KM);
    assert.equal(point.distanceTo(coordinates[1], true), NE_DIST_KM);
  });

});
