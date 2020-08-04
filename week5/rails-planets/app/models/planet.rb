
class Planet < ApplicationRecord

  # All the behaviour of our model class
  # for talking to the 'planets' table
  # is inherited from ApplicationRecord,
  # which itself inherits from
  # ActiveRecord::Base

  # Now we can write code like 'Planet.all'
  # to get every row in the 'planets' table.
  # Rails knows to look in the 'planets' table
  # because of the class name.
  # NAMING CONVENTIONS!!!

end
