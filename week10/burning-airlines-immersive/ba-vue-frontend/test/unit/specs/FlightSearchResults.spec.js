import Vue from 'vue';
import { mount } from '@vue/test-utils';
import axios from 'axios'; // import here to replace version imported in component!

import FlightSearchResults from '@/views/FlightSearchResults';

const RAILS_FLIGHT_SEARCH_BASE_URL = 'http://localhost:3000/flights/search';

const fakeResults = [
  {
    id: 111,
    flight_number: 'Flight Num 1',
    departure_date_formatted: 'test_date 1',
    airplane: { name: '747 Test' },
    origin: 'SYD',
    destination: 'MEL',
  },
  {
    id: 222,
    flight_number: 'Flight Num 2',
    departure_date_formatted: 'test_date 2',
    airplane: { name: '757 Test' },
    origin: 'SYD',
    destination: 'MEL',
  }
];

axios.get = sinon.stub().returns(Promise.resolve({ data: fakeResults }));


const $router = { push: sinon.spy() };


describe('<FlightSearchResults />', () => {

  let wrapper;

  // before() doesn't refresh wrapper component after each it() example
  // ... leaking state/nondeterministic?
  beforeEach( ()=> {
    wrapper = mount(FlightSearchResults, {
      propsData: { origin: 'SYD', destination: 'MEL' },
      mocks: { $router },
    });
  });


  it('should show a loading message until the data loads', async () => {

    // const wrapper = mount(FlightSearchResults, {
    //   propsData: { origin: 'SYD', destination: 'MEL' },
    //   mocks: { $router },
    // });

    expect( wrapper.text() ).to.contain('Loading results');

    // (still have to stub axios for this to work... do after next example)
    //
    await wrapper.vm.$nextTick(); // wait for axios.get promise to resolve and state update + rerender to happen!
    expect( wrapper.text() ).to.not.contain('Loading results');

  });


  it('should render a list of flight results',  async () => {

    // const wrapper = mount(FlightSearchResults, {
    //   propsData: { origin: 'SYD', destination: 'MEL' },
    //   mocks: { $router },
    // });

    expect( axios.get ).to.have.been.calledWith(`${RAILS_FLIGHT_SEARCH_BASE_URL }/SYD/MEL`);


    // await flushPromises(); // separate package

    await wrapper.vm.$nextTick(); // don't need this if beforeEach => before (same component already rendered in previous test - LEFTOVER STATE though!)

    // console.log('flights', wrapper.vm.flights);

    expect( wrapper.vm.flights.length ).to.equal( 2 );

    expect( wrapper.vm.flights[0].id ).to.equal( 111 ); // etc
    // OR all at once (might need .to.deep.equal in other cases):
    expect( wrapper.vm.flights[0] ).to.equal( fakeResults[0] );
    expect( wrapper.vm.flights ).to.equal( fakeResults );

    const resultDivs = wrapper.findAll('div.result');

    expect( resultDivs.length  ).to.equal( 2 ); // should be 2 results (fakeData)

    expect( resultDivs.at(0).text() ).to.contain('Flight Num 1');
    expect( resultDivs.at(0).text() ).to.contain('747 Test');
    expect( resultDivs.at(1).text() ).to.contain('Flight Num 2');
    expect( resultDivs.at(1).text() ).to.contain('757 Test');

  }); // it


  it('should push to the correct FlightShow route when a flight is clicked', async () => {

    await wrapper.vm.$nextTick(); // wait for flights to load

    await wrapper.find('div.result').trigger('click'); // click first result

    expect( $router.push ).to.have.been.calledWith(sinon.match({
      name: 'FlightShow', params: { id: 111 }
    }));

  }); // it



}); // describe FlightSearchResults
