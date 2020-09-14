require 'rails_helper'

RSpec.describe FruitsController, type: :controller do

  describe 'GET #index' do

    before do
      @shelf = Shelf.create name: 'a shelf'
      3.times do |i|
        Fruit.create name: "Fruit number #{i}", shelf: @shelf
      end
      @fruits = Fruit.all
    end

    describe 'in HTML format' do

      before do
        get :index  # Actually make a request (defaults to HTML)
      end

      it 'returns HTTP success' do
        expect( response ).to have_http_status(:success)
      end

      it 'renders the index template' do
        expect( response ).to render_template(:index)
      end

      it 'assigns the instance variable @fruits which contains all fruits in the database' do
        expect( assigns(:fruits) ).to be
        expect( assigns(:fruits).length ).to eq @fruits.length
        expect( assigns(:fruits).first ).to be_a Fruit
      end

      it 'assigns to @fruits the DB fruits in reverse order' do
        expect( assigns(:fruits).first.name ).to eq @fruits.last.name
      end

    end # HTML


    describe 'in JSON format' do

      before do
        get :index, format: 'json'
      end

      it 'returns HTTP success' do
        expect( response ).to have_http_status(:success)
      end

      it 'provides the names of the fruits in the JSON response' do
        fruits = JSON.parse( response.body )

        expect( fruits.length ).to eq @fruits.length
        expect( fruits.first['name'] ).to eq @fruits.last.name
      end

    end # JSON


  end  #  GET #index


  # TODO: test POSTing data!
  describe 'POST to #create' do

    # before block here to create @shelf ?

    describe 'a fruit with valid information' do

      before do

        @shelf = Shelf.create name: 'Test Shelf'

        post :create, params: {
          fruit: {
            name: 'Strawberry',
            shelf_id: @shelf.id
          }
        }

      end # before


      #### superseded by redirect example below
      # it 'returns HTTP success' do
      #   expect( response ).to have_http_status(:success)
      # end


      it 'increases the number of fruits in the database by 1' do
        expect( Fruit.all.length ).to eq 1
      end


      it 'redirects to the show action for this fruit' do
        expect( response ).to redirect_to( Fruit.first )
      end


    end  # valid info

    describe 'a fruit with invalid information' do

      before do
        @shelf = Shelf.create name: 'Test Shelf'

        post :create, params: {
          fruit: {
            name: '',
            shelf_id: @shelf.id
          }
        }

      end # before


      it 'does not increase the number of fruits in the DB' do
        expect( Fruit.all.length ).to eq 0
      end

      it 'renders the #new template' do
        expect( response ).to render_template( :new )
      end


    end  # invalid info


  end # POST to #create


end # describe FruitsController
