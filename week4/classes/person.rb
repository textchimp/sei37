
require 'pry'

# Classes are capitalised camel case in Ruby! (and everywhere else i.e. JS)
class Person

  # This causes Ruby to automatically write
  # the setter and getter methods 'name()' and
  # 'name=()' for the @name instance variable
  attr_accessor :name, :age


  # To be able to say e.g. p1.name, we need to
  # define a method called 'name' that returns
  # the instance variable
  # i.e. "I am deliberately giving the outside"
  # This is the GETTER for @name
  # def name
  #   @name # return this value!
  # end
  #
  # # This is the SETTER for @name
  # def name=( val )
  #   @name = val # change the value of @name to be the value of the argument to this method
  # end

  # If you use 'self.' at the start of your method
  # name, you create a 'class method' - this is
  # method that you run directly on the class
  # itself, not an an object instance of the class
  def self.describe
    puts "This is a class for making people! And breeding them apparently."
  end



  def +( second_person )
    new_name = "#{ self.name } #{ second_person.name }"
    Person.new new_name
  end

  # This is actually what runs when you
  # call Person.new

  def initialize( first_name, age )
    puts "Making a new Person object: #{ first_name }"

    # Save the argument as an instance variable
    # ...if we don't save 'first_name', it won't
    # be visible to any of the other methods of
    # this object for the rest of the object's
    # life, because 'first_name' is a local variable
    @name = first_name
    @age  = age

    # it doesn't matter what the last line of
    # initialize() is, Ruby will always return
    # the object!

  end

  def hello
    puts "Hello! My name is #{ @name } and I am #{ @age } years old. Please like and subscribe to my page!"
  end # hello

  def goodbye
    puts "It was great to meet you! Don't forgot to follow me on Instagram and smash that Like button."
  end # goodbye

end  # class Person



# Make a subclass / derived class / child class

# The Comedian class inherits ALL the methods
# and instance variables of the Person class
class Comedian < Person

  def initialize( first_name )
    # call the parent constructor:
    # i.e. Person.new( first_name, 50 )
    super first_name, 50 # hard-code 50 as the age
  end

  # This is a new method that ONLY Comedian
  # objects can use
  def tell_joke
    puts "What's brown and sticky?"
    3.times do
      print '.'
      sleep 0.4
    end
    puts "A stick! AHAHAHAHAHA!"
  end # tell_joke()

  # We can also REDEFINE ('override') methods
  # that we inherited from our parent class
  def hello
    # The 'super' method calls the method in the
    # parent class which has the same name as
    # the method in which the 'super' line appears
    super  # actually run hello() from Person

    # ...and then run our custom code:
    puts "Hi, I'm #{ @name }. Please watch my NetFlix special."
  end # hello()


end # class Comedian


binding.pry # start pry here
puts 'stop here please' # otherwise no pry!
