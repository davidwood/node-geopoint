var assert = require('assert'),
    GeoPoint = require('../'),
    LAT_DEG = 40.689604,
    LON_DEG = -74.04455,
    SW_LAT_KM = 40.50973996113307,
    SW_LON_KM = -74.28175887602288,
    SW_DIST_KM = 28.30334049313065,
    NE_LAT_KM = 40.86946803886694,
    NE_LON_KM = -73.80734112397712,
    NE_DIST_KM = 28.2651684254543,
    BOUNDINGBOX = [new GeoPoint(SW_LAT_KM, SW_LON_KM), new GeoPoint(NE_LAT_KM, NE_LON_KM)];

describe('.isInBoundingBox(boundingBox)', function() {

  it('should throw an error if boundingBox is not valid', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG);
    ['foo', 0 / 0, void 0, -1, 0, [0, 0], [[0, 0], [0, 0]]].forEach(function(value) {
      var error;
      try {
        point.isInBoundingBox(value);
      } catch (e) {
        error = e;
      }
      assert.ok(error instanceof Error);
      assert.equal(error.message, 'Invalid boundingBox');
    });
  });

  it('should return a boolean', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        isInBoundingBox = point.isInBoundingBox(BOUNDINGBOX);
    assert.equal(typeof isInBoundingBox, 'boolean');
    assert.ok(isInBoundingBox === true || isInBoundingBox === false);
  });
  
  it('should check for proper working', function() {
    var point = new GeoPoint(LAT_DEG, LON_DEG),
        isInBoundingBox = point.isInBoundingBox(BOUNDINGBOX);
    assert.equal(typeof isInBoundingBox, 'boolean');
    assert.ok(isInBoundingBox === true || isInBoundingBox === false);
    assert.equal(isInBoundingBox, true);
  });
  
  

});
