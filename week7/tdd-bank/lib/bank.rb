
class Bank

  attr_reader :name, :accounts  #the Ruby shortcut to write a getter that looks like:
  # def name
  #   @name
  # end

  def create_account( name, balance=0 )
    @accounts[ name ] = balance
  end # create_account()

  def deposit( name, amount )
    return @accounts[name] unless amount > 0
    @accounts[ name ] += amount
  end

  def withdraw( name, amount )
    return unless @accounts[ name ] >= amount
    @accounts[ name ] -= amount 
  end

  def initialize( name )
    @name = name
    @accounts = {}  # initialise account as an empty hash
  end


end # class Bank
