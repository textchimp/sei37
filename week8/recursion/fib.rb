# Iterative solution
def fib( n )

  a = 1
  b = 1

  n.times do
    temp = a
    a = b
    b = a + temp

    # a, b = b, (a + b)
  end

  a  # return this value

end

puts fib(50)

# fib:     1, 1, 2, 3, 5, 8, 13, 21,
# indexes: 0, 1, 2, 3, 4, 5,  6,  7
