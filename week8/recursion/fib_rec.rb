
def fib_rec( n )

  # Define the base case
  if n < 2
    return 1  # hardcoded, fib(0) = 1, fib(1) = 1
  else
    # Recursive call
    return fib_rec(n - 1) + fib_rec(n - 2)
  end
end


puts fib_rec( 50 )
