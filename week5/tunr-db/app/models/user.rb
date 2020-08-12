class User < ApplicationRecord
  has_many :mixtapes  # one-to-many

  # many-to-many, for 'like/fave':
  # The method name 'mixtapes' is already taken by the has_many association
  # above, so we need to rename our HABTM association for liking mixtapes.
  # We can call it whatever we want, i.e. 'liked_mixtapes', BUT then we
  # have to tell ActiveRecord what the class/model is for the other end of
  # this association, since it's no longer possible to work it out
  # automatically from the name.
  has_and_belongs_to_many :liked_mixtapes, class_name: 'Mixtape'


  # Uses the bcrypt gem to turn an incoming plaintext 'password' into
  # an encrypted 'password_digest'
  has_secure_password  # includes some password validations, i.e. can't be blank

  # When creating a User, the 'name' field must be present, i.e. not blank
  validates :name, length: { minimum: 2 }

  validates :email, presence: true, uniqueness: true

  # Follow associations:

  # foreign_key here tells AR where to look in the 'follows' table to find this relationship,
  # i.e. look in the column called 'follower_id', which should have the ID of the current user,
  # to find out what that user is followING;
  # if we don't specify the foreign_key here, it will default to trying to use the singular form
  # of the name of the association ('following_relationship_id') as the ID column, which is wrong.
  has_many :following_relationships, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :followed_relationships,  class_name: 'Follow', foreign_key: 'followed_id', dependent: :destroy

  # The above assocations give us e.g.
  #   User.first.following_relationships
  # which returns an array of Follow objects... NOT user objects!
  # To fix that:

  has_many :following, through: 'following_relationships', source: 'followed'
  # The 'source:' here is telling AR, "To find the other users that this user is following,
  # you need to look in the 'followed_id' field of the Follow objects in the '.following_relationships'
  # association above

  has_many :followers, through: 'followed_relationships', source: 'follower'


end
