require 'rails_helper'

RSpec.describe Fruit, type: :model do

  # Arrange, Act, Assert

  # Test that a Fruit belongs_to a shelf
  # (i.e. one to many association from shelf
  #  to fruits)
  it { should belong_to(:shelf) }


  before do
    @shelf = Shelf.create name: 'Test Shelf'
    @pear = Pear.create name: 'Nashi', shelf_id: @shelf.id  # Arrange
    @pear_retrieved = Pear.find @pear.id  # Act
  end

  it 'should create a valid fruit object' do
    # define & test our expectations
    expect( @pear_retrieved ).to_not be_nil  # Assert
    expect( @pear_retrieved ).to eq @pear
  end

  it 'should remember its name' do
    expect( @pear_retrieved.name ).to eq @pear.name
  end

  it 'should remember its class via Single Table Inheritance' do
    expect( @pear_retrieved.class ).to eq Pear

    expect( @pear_retrieved ).to be_a Pear

    # Check the parent class (superclass/base class)
    expect( @pear_retrieved.is_a? Fruit ).to be true
    expect( @pear_retrieved).to be_a Fruit # also works for base

    expect( @pear_retrieved.class.ancestors ).to include Fruit

  end

  it 'should be squishy, for Pears' do
    expect( @pear_retrieved.squishy? ).to eq true
  end

  # Test validations on a model:

  it 'should fail validation when created without a name' do
    pear = Pear.create shelf: @shelf # no  name, should fail!
    expect( pear ).to be_invalid
  end

  it 'should validate the uniqueness of the name' do
    pear_duplicate = Pear.create name: @pear.name, shelf: @shelf

    expect( pear_duplicate ).to_not be_valid
  end

  it 'should be invalid when created without specifying a shelf' do
    pear = Pear.create name: 'testpear'
    expect( pear ).to_not be_valid
  end


end # describe Fruit
