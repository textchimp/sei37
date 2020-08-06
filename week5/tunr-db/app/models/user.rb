class User < ApplicationRecord
  has_many :mixtapes

  # Uses the bcrypt gem to turn an incoming plaintext 'password' into
  # an encrypted 'password_digest'
  has_secure_password

end
