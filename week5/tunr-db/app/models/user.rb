class User < ApplicationRecord
  has_many :mixtapes

  # Uses the bcrypt gem to turn an incoming plaintext 'password' into
  # an encrypted 'password_digest'
  has_secure_password  # includes some password validations, i.e. can't be blank

  # When creating a User, the 'name' field must be present, i.e. not blank
  validates :name, length: { minimum: 2 }

  validates :email, presence: true, uniqueness: true

end
