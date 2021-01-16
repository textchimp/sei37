// Chai is the assertion library used by default in vue-cli projects
// Sinon is for spies/stubs

import Vue from 'vue';
import { mount } from '@vue/test-utils';
import sinon from 'sinon';

// BROKEN OUTTA THE FUCKEN BOX, nice work everyone!
// import { render, fireEvent } from '@testing-library/vue';

// const localVue = createLocalVue(); // to allow router overwrite?
// localVue.use(VueRouter)
// const routes = [{ path: '/foo', component: Foo }]

import FlightSearch from '@/views/FlightSearch';

describe('<FlightSearch />', () => {
  it('should render correct contents', async () => {

    // TODO: stub vs spy?
    // spy - simpler, just tell if something was called and with which args;
    // stub - change what a the stubbed function does, i.e. force return values
    //        of different kinds
    // mock - combo of both above behaviours?
    const $router = { push: sinon.spy() };

    const wrapper = mount(FlightSearch, {
      // propsData: { msg: 'Hello world' },
      mocks: { $router }
    });

    // basic example, text matching on entire page
    expect(wrapper.text()).to.contain('Flight Search');

    const selects = wrapper.findAll('select');
    // 👆can also use some kind of data-testid="origin" attribute for testing?
    expect( selects.length ).to.equal(2); // origin and destination

    // console.log(options.at(1).text());

    const originOption = selects.at(0).findAll('option').at(1);
    await originOption.setSelected(); // choose from dropdown
    expect( wrapper.vm.origin ).to.equal( originOption.text() );

    const destinationOption = selects.at(1).findAll('option').at(1);
    await destinationOption.setSelected(); // choose from dropdown
    expect( wrapper.vm.destination ).to.equal( destinationOption.text() );
    // "DON'T TEST THE FRAMEWORK!" v-model probably works!

    // expect( $router.push ).to.have.been.called  // - no parens! boolean

    await wrapper.find('button').trigger('click');

    // Need to use sinon.match() to check fn called with specific object as arg
    // Note component could also call .push('/search/SYD/MEL'), i.e. React style
    expect( $router.push ).to.have.been.calledWith(sinon.match({
      name: 'SearchResults',
      params: {
        origin: originOption.text(),
        destination: destinationOption.text(),
      }
    }));

     // // BEFORE showing async-await version, show .then issues:
     // // Using .then() on UI triggers:
     // // NOTE:  IF THERE ARE ERRORS WE DON'T EVEN SEE THEM BECAUSE OF .then()
     // //        catching them - so this is no good for testing!
     // options.at(1).setSelected()
     // .then(() => {
     //   // do test
     //   expect( wrapper.origin ).to.equal( 'hello' );
     //   done();  // <= this is the argument given to the it() callback
     // });


    // console.log(wrapper.text());
    //
    // // const { getByText } = render(Component)
    // const wrapper = render(FlightDetails);
    // const Constructor = Vue.extend(FlightDetails);
    // const vm = new Constructor().$mount()
    //
    // expect( vm.$el.querySelector('h3').textContent )
    //   .to.equal('Flight Search');


    // // ORIGIN DEFAULT TEMPLATE (not using vue-test-utils?)
    // const Constructor = Vue.extend(HelloWorld)
    // const vm = new Constructor().$mount()
    // expect(vm.$el.querySelector('.hello h1').textContent)
    //   .to.equal('Welcome to Your Vue.js App')

  }); // it
}); // describe
