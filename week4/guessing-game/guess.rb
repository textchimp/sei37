# Activity:
# You are to generate a basic "guess my number" game. The computer will pick a random number between 0 and 10. The user will guess the number until they guess correctly.
# Specification:
# The user should be asked to guess a number
# If the user's guess is correct, the user should see a congratulatory message
# If the user's guess is not correct, the user should be asked to guess the number again.
# Extensions:
# Let the user choose the maximum value (so they can play a long game with a random value between 0 and 10000, for example).
# Give feedback to the user: "Wrong, guess higher!" or "Wrong, guess lower!"



# "I want to use a particular library (from a gem) in this code"
# i.e. this is like <script src=""> tags in JS
require 'colorize'

print "Enter maximum guess value: "
max_value = gets.to_i

secret_number = rand(0..max_value)  # includes max_value itself

guess = -1

# while guess is not correct.... keep asking for another guess

# while guess != secret_number
until guess == secret_number
  print "Enter your guess: "
  guess = gets.to_i
  # puts "Try again" if guess != secret_number

  # pause the code here, and open pry
  # require 'pry'; binding.pry

  if guess > secret_number
    puts "Wrong! Guess lower.".red
  elsif guess < secret_number
    puts "Wrong! Guess higher.".yellow
  end

end  # while

puts "Congratulations! You guessed correctly.".green
