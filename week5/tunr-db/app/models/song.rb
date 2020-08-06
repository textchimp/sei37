class Song < ApplicationRecord
  belongs_to :album, optional: true
  belongs_to :artist, optional: true
  # 'optional: true' means we can create a
  # song without specify the album or artist it
  # belongs to right at that time
  # i.e. Song.create title: 'Achy Breaky Heart'

  # Many-to-many association between songs and genres
  has_and_belongs_to_many :genres

  has_and_belongs_to_many :mixtapes

end
