var assert = require('assert'),
    GeoPoint = require('../'),
    LAT_DEG = 40.689604,
    LON_DEG = -74.04455,
    LAT_DEG2 = 38.890298,
    LON_DEG2 = -77.035238,
    DISTANCE_MI = 201.63714020616294,
    DISTANCE_KM = 324.503521805324;

describe('.distanceTo(point, inKilometers)', function() {

  it('should throw an error if the point is not a GeoPoint', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);
    ['foo', 0/0, void 0].forEach(function(value) {
      var error;
      try {
        point.distanceTo(value);
      } catch (e) {
        error = e;
      }
      assert.ok(error instanceof Error);
      assert.equal(error.message, 'Invalid GeoPoint');
    });
  });

  it('should return the distance if inKilometers is false', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        point2 = new GeoPoint(LAT_DEG2, LON_DEG2),
        distance = point.distanceTo(point2, false);
    assert.equal(distance, DISTANCE_MI);
  });

  it('should return the distance in kilometers if inKilometers is true', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        point2 = new GeoPoint(LAT_DEG2, LON_DEG2),
        distance = point.distanceTo(point2, true);
    assert.equal(distance, DISTANCE_KM);
  });

  it('should return the distance in miles by default', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        point2 = new GeoPoint(LAT_DEG2, LON_DEG2),
        distance = point.distanceTo(point2);
    assert.equal(distance, DISTANCE_MI);
  });

});
