
// Load the app code that we want to test
const adder = require('../lib/adder');

// sinon lets us "spy" on functions
// to make sure they were called
const sinon = require('sinon');

const { expect }  = require('chai');

describe('adder module', () => {

    it('should export the add function', () => {
      // console.log('Got hereeeee');
      expect( typeof adder.add ).to.equal( 'function' );
    });

    it('should add two numbers correctly', () => {
      // setup (arrange/act)
      const sum = adder.add( 2, 100 );

      // Assert:
      expect( sum ).to.equal( 102 );
    });

    it('should call the checker method to confirm its results', () => {
      const checkerSpy = sinon.spy(adder, 'checker');

      const sum = adder.add( 2, 100 );

      // Was the internal function called at all?
      // expect( checkerSpy.callCount ).to.equal( 1 );

      // Was it called with the right arguments?
      expect( checkerSpy.calledOnceWith(2, 100, 102) ).to.equal(true);

    })

}); // describe adder
