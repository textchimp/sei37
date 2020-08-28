
arr = [ 1,2,3,4,5 ]

# loop over each item and print
# arr.each do |item|
#   puts item
# end

def recursive_each( array, indent=0 )

  # 1. REMOVE the first item from the array,
  #    and print it

  # first = array.first; rest  = array[1..-1]; first   = array.shift

  first, *rest = array

  spaces = "     " * indent

  puts "#{spaces} >>>> Starting recursive_each( #{array} )"
  puts "#{spaces} first: #{ first }"
  puts "#{spaces} rest: #{ rest }"


  # 2. Pass the REST of the array recursively
  #    to this same function....
  # 3. Until the array is empty (base case)
  if rest.any?
    recursive_each( rest, indent+1 )   # n - 1
    puts 'back!'
  end

  puts "#{ spaces } <<<<< returning from recursive_each( #{array} ) "

end # recursive_each()


recursive_each( arr )
