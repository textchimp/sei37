class Follow < ApplicationRecord
  # A follow belongs to two users: the follower (active),
  # and the followed (passive). ActiveRecord knows from
  # the name of the association to use the 'follower_id' column
  # (or the 'followed_id' column), but it doesn't know what those
  # are the IDs *for*, since there is no 'followers' of 'followeds'
  # table. Actually, since both are IDs in the 'users' table, we tell
  # it that using ` class_name: 'User' `
  belongs_to :follower, class_name: 'User'
  belongs_to :followed, class_name: 'User'
end
