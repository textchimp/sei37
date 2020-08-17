
# First, we need to load up the app code we are actually testing:
require_relative '../lib/bank'

# Now we can start writing tests using the DSL of RSpec

describe Bank do

  # This makes a 'bank' object, and runs uniquely
  # before each 'it' example
  # (like a Rails controller before_action)
  let( :bank ){ Bank.new 'GA Bank' }

  describe '.new' do

    # This is the test section for making sure that we can
    # actually create a new instance of our Bank class,
    # by running Bank.new()


    # This is our first 'example'
    it 'creates a new Bank object' do
      # AAA: Arrange, Act, Assert
      # Assert:
      expect( bank ).to_not be nil
      expect( bank ).to be_a Bank  # must be an instance of Bank
    end

    it 'assigns a name to the bank' do
      expect( bank.name ).to eq 'GA Bank'
    end

  end # .new


  describe '#create_account' do

    it 'creates an account for some specific person' do
      # Act:
      bank.create_account 'Craigsy', 200
      # Assert:
      expect( bank.accounts['Craigsy'] ).to eq 200
    end

    it 'creates an account with a zero default balance when no starting balance is specified' do
      bank.create_account 'Craigsy'
      expect( bank.accounts['Craigsy'] ).to eq 0
    end

  end #  #create_account

  describe '#deposit' do

    it 'deposits the correct amount into the specified account' do
      bank.create_account 'Craigsy', 100  # Arrange
      bank.deposit 'Craigsy', 200         # Act
      expect( bank.accounts['Craigsy'] ).to eq 300   # Assert
    end

    it 'only changes the balance when the deposit amount is greater than zero' do
      bank.create_account 'Craigsy', 100  # Arrange
      bank.deposit 'Craigsy', -555        # Act
      expect( bank.accounts['Craigsy'] ).to eq 100
    end

    it 'returns the new balance for the account' do
      bank.create_account 'Craigsy', 100  # Arrange
      result = bank.deposit 'Craigsy', 11
      expect( result ).to eq 111
    end

    it 'returns the unchanged balance when a negative deposit amount is given' do
      bank.create_account 'Craigsy', 100
      result = bank.deposit 'Craigsy', -5
      expect( result ).to eq 100
    end

  end  #  #deposit

  describe '#withdraw' do

    it 'withdraws the correct amount from the specified account' do
      bank.create_account 'Jonesy', 100
      bank.withdraw 'Jonesy', 70
      expect( bank.accounts['Jonesy'] ).to eq 30
    end

    it 'ignores withdrawals that exceed the account balance' do
      bank.create_account 'Jonesy', 100
      bank.withdraw 'Jonesy', 200
      expect( bank.accounts['Jonesy'] ).to eq 100
    end

    # TODO: test that #withdraw returns the new
    # balance, and returns an unchanged balance
    # for overdraws (as with #deposit)

  end #  #withdraw


end # describe Bank
