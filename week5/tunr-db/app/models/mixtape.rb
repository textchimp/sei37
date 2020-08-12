class Mixtape < ApplicationRecord
  has_and_belongs_to_many :songs

  has_and_belongs_to_many :liked_by_users, class_name: 'User'   # many-to-many for likes/faves

  belongs_to :user, optional: true
end
