'use strict';

describe('phoneDetail', function() {

  // Load the module that contains the `phoneDetail` component before each test
  beforeEach(module('phoneDetail'));

  // Test the controller with a positive test
  describe('PhoneDetailController', function() {
    var $httpBackend, ctrl;
    var xyzPhoneData = {
      name: 'phone xyz',
      images: ['image/url1.png', 'image/url2.png']
    };

    beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData);

      $routeParams.phoneId = 'xyz';

      ctrl = $componentController('phoneDetail');
    }));

    it('should fetch the XYZ phone details', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.phone).toEqual({});

      $httpBackend.flush();
      expect(ctrl.phone).toEqual(xyzPhoneData);
    });

  });

  // Test the controller with a negative test
    describe('PhoneDetailController', function() {
      var $httpBackend, ctrl;
      var xyzPhoneData = {
            name: 'phone xyz',
            images: ['image/url1.png', 'image/url2.png']}
      var abcPhoneData = {
        name: 'phone abc',
        images: ['image/url2.png', 'image/url4.png']
      };

      beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('phones/abc.json').respond(abcPhoneData);

        $routeParams.phoneId = 'abc';

        ctrl = $componentController('phoneDetail');
      }));

      it('should NOT fetch the XYZ phone details with ABC phone details', function() {
        jasmine.addCustomEqualityTester(angular.equals);

        expect(ctrl.phone).toEqual({});

        $httpBackend.flush();
        expect(ctrl.phone).not.toEqual(xyzPhoneData);
      });

    });

});
