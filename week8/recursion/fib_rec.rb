
# TODO: memoize this recursive function!
# create a hash, and each time the function
# runs, it checks if n (its argument) is already
# a key in the hash; if not, run the functin
# as normal, but SAVE the return value of the
# function as a value of the key n, in the hash.
# If the key is already in the hash, that means
# fib(n) has already been calculated, so use
# the value of that key as your return value.

def fib_rec( n )

  # Define the base case
  if n < 2
    return 1  # hardcoded, fib(0) = 1, fib(1) = 1
  else
    # Recursive call
    return fib_rec(n - 1) + fib_rec(n - 2)
  end
end

puts fib_rec( ARGV.first.to_i )
