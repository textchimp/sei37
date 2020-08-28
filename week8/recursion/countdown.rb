require 'pry-nav'

# iterative version
def countdown( n=10 )

   while n >= 0
     puts n
     # do something each iteration that gets
     # us incrementally closer to getting
     # out of this loop:
     n -= 1
     sleep 0.3
   end

   puts "Blast off!"

end # countdown()


# countdown()


# recursive solution

# variables/constants
# functions
# conditionals

@stack_depth = 0

def countdown_rec( n=10 )

  # Define a 'base case': a condition under
  # which this function STOPS calling
  # itself recursively; otherwise, you will
  # have an infinite loop/regress
  if n < 0
    puts "Blast off!"
  else

    # Not finished yet, perform recursive call
    #
    # BUT: We have to do so in a way that brings
    # us a step closer to reaching the base case
    # defined above, where the recursion stops.
    puts n
    sleep 0.3
    countdown_rec( n - 1 )  # recursive call

    require 'pry'; binding.pry
    puts "Returned"

  end

  puts "Backing out... n=#{ n }"

end # countdown_rec


countdown_rec()
