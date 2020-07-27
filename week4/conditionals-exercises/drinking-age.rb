# Ask the user for their age.
# Remember that anytime you get input, it is a string, so you will need to change the age input to a number.
# If age is less than 18, print an appropriate message.
# If the age is equal to or over 18, print a different message.

print "Please enter your age: "
age = gets.to_i

# p age
# puts "Age is #{ age }"

if age < 18
  puts "Go drink some cordial in the sandpit, kid!"
else
  puts "Come on in and enjoy the liver damage!"
end
