require 'pry'

# What if you didn't have arrays?

# We will have a bunch data items, called 'nodes'
# Each node will store a single piece of data,
# i.e. what you would store in a single array position,
# and the node will also know what the *next* node is.

class SinglyLinkedList

  # keep track of the first node in the list:
  attr_accessor :head

  def initialize( value )
    # Create a new instance of the Node class,
    # and pass the argument to this Node as its
    # starting value; finally, save the new node
    # object as the head of the new list
    @head = Node.new value
  end

  # Add a new node to the start of the list
  def prepend( value )
    new_node = Node.new value # Create a new node to store the value

    # Whatever was at the head of the list, is now the 'next'
    # for this new first node
    new_node.next = @head

    # The new head of the list is this new node we just created
    @head = new_node
  end # prepend()


  # Add a new node to the end of the list.
  # This is harder than prepend() because we don't know
  # where the end of the list is! We actually have to loop
  # through all the nodes starting from @head until we find
  # it.
  def append( value )

    # Find the last node in this list
    # i.e. keep looking at every next node
    # until the next node is nil
    # In other words, even just finding the last item in
    # a singly linked list is O( N ) time complexity (linear)
    node = @head
    while node.next
      node = node.next  # kind of like incrementing a loop counter
    end # while

    # Now that the loop has exited, 'node' contains the last
    # node in this list (because its 'next' value was nil);
    # so we now know where to append our new node.
    node.next = Node.new value

  end # append()


  # Ruby will look for the 'to_s' method to be defined on
  # any object you try to print using 'puts', and will
  # run the method to get a printable string. In this way
  # you can always provide a clear output for your custom
  # objects with weird internal structures
  def to_s
    output = ''
    node = @head
    while node.next
      output += node.value + ', '
      node = node.next
    end

    output += node.value  # last value, no dangling comma

    output  # return the whole string
  end  # to_s()


  # Find a node in the list by value
  def find( needle )

    node = @head
    while node
      if node.value == needle
        return node
      end
      node = node.next # this moves us on to the next node
    end

  end # find()


  def insert_after( node, value )
    new_node = Node.new value
    # Our new node now points to the insert-after node's
    # next node
    new_node.next = node.next
    # The insert-after node's next node is the new node
    node.next = new_node
  end


  # HOMEWORK: implement these methods:

  def length
    # Returns the length of the list
    # - this will require iteration!
    # Bonus: make an instance variable that keeps track
    # of the length without looping, by updating itself
    # whenever the list changes length
  end

  def at_index( index )
    # Return the node at the specified index
    # AKA array indexing
    # Another name for this method would be 'def []( index )'
  end

  def reverse
    # Return a reversed version of the list
    # (don't change the original)
  end

  def reverse!
    # change self to be the reversed list
  end

  def shift
    # Remove the node from the start of the list,
    # and return it
  end

  def delete( node )
    # Remove the specified node from the list
    # - requires .at_index or .find to actually get a
    # node first, to pass to this method
    # Make sure you don't break the chain!
  end


  # Bonus:

  def each
    # Needs to take a block
    # Google 'yield'

    # THEN: can you rewrite the above methods
    # using .each

  end


  def map
    # As above but applies block to each value
    # and returns an array of those transformed values
  end

  # reduce ??


  # The Node class is only for interal use by
  # the SinglyLinkedList class
  class Node
    # TODO: Research ruby 'Struct' to create simple data
    # container classes in one line

    # getter and setter methods for these instance variables
    attr_accessor :value, :next

    def initialize( value )
      @value = value
      @next = nil
    end

  end  # class Node

end  # class SinglyLinkedList


list = SinglyLinkedList.new 'Groucho'

list.append 'Harpo'
list.append 'Chico'


h = list.find 'Harpo'
list.insert_after h, 'Zeppo'

binding.pry
puts "Done."
