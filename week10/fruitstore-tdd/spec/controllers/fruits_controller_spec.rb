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

end # describe FruitsController
