var assert = require('assert'),
    GeoPoint = require('../');

describe('Conversions', function() {

  describe('.degreesToRadians(value)', function() {
    
    it('should throw an error if the value is not a number', function() {
      ['foo', 0/0, void 0].forEach(function(value) {
        var error;
        try {
          GeoPoint.degreesToRadians(value);
        } catch (e) {
          error = e;
        }
        assert.ok(error instanceof Error);
        assert.equal(error.message, 'Invalid degree value');
      });
    });

    it('should convert degrees to radians', function() {
      assert.equal(GeoPoint.degreesToRadians(0), 0);
      assert.equal(GeoPoint.degreesToRadians(45), Math.PI / 4);
      assert.equal(GeoPoint.degreesToRadians(90), Math.PI / 2);
      assert.equal(GeoPoint.degreesToRadians(135), 3 * Math.PI / 4);
      assert.equal(GeoPoint.degreesToRadians(180), Math.PI);
      assert.equal(GeoPoint.degreesToRadians(225), 5 * Math.PI / 4);
      assert.equal(GeoPoint.degreesToRadians(270), 3 * Math.PI / 2);
      assert.equal(GeoPoint.degreesToRadians(315), 7 * Math.PI / 4);
      assert.equal(GeoPoint.degreesToRadians(360), 2 * Math.PI);
      assert.equal(GeoPoint.degreesToRadians(450), (Math.PI / 2) + (Math.PI * 2));
      assert.equal(GeoPoint.degreesToRadians(540), Math.PI + (Math.PI * 2));
      assert.equal(GeoPoint.degreesToRadians(810), (Math.PI / 2) + (Math.PI * 2) * 2);
    });

  });

  describe('.radiansToDegrees(value)', function() {
    
    it('should throw an error if the value is not a number', function() {
      ['foo', 0/0, void 0].forEach(function(value) {
        var error;
        try {
          GeoPoint.radiansToDegrees(value);
        } catch (e) {
          error = e;
        }
        assert.ok(error instanceof Error);
        assert.equal(error.message, 'Invalid radian value');
      });
    });

    it('should convert radians to degrees', function() {
      assert.equal(GeoPoint.radiansToDegrees(0), 0);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI / 4), 45);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI / 2), 90);
      assert.equal(GeoPoint.radiansToDegrees(3 * Math.PI / 4), 135);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI), 180);
      assert.equal(GeoPoint.radiansToDegrees(5 * Math.PI / 4), 225);
      assert.equal(GeoPoint.radiansToDegrees(3 * Math.PI / 2), 270);
      assert.equal(GeoPoint.radiansToDegrees(7 * Math.PI / 4), 315);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI * 2), 360);
      assert.equal(GeoPoint.radiansToDegrees((Math.PI / 2) + (Math.PI * 2)), 450);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI + (Math.PI * 2)), 540);
      assert.equal(GeoPoint.radiansToDegrees((Math.PI / 2) + (Math.PI * 2) * 2), 810);
    });

  });

  describe('.milesToKilometers(value)', function() {

    it('should throw an error if the value is not a number', function() {
      ['foo', 0/0, void 0].forEach(function(value) {
        var error;
        try {
          GeoPoint.milesToKilometers(value);
        } catch (e) {
          error = e;
        }
        assert.ok(error instanceof Error);
        assert.equal(error.message, 'Invalid mile value');
      });
    });

    it('should convert miles to kilometers', function() {
      assert.equal(GeoPoint.milesToKilometers(1), 1.6093439999999999);
      assert.equal(GeoPoint.milesToKilometers(5), 8.046719999999999);
    });

  });

  describe('.kilometersToMiles(value)', function() {

    it('should throw an error if the value is not a number', function() {
      ['foo', 0/0, void 0].forEach(function(value) {
        var error;
        try {
          GeoPoint.kilometersToMiles(value);
        } catch (e) {
          error = e;
        }
        assert.ok(error instanceof Error);
        assert.equal(error.message, 'Invalid kilometer value');
      });
    });

    it('should convert miles to kilometers', function() {
      assert.equal(GeoPoint.kilometersToMiles(1), 0.621371192237334);
      assert.equal(GeoPoint.kilometersToMiles(5), 3.1068559611866697);
    });

  });

});

