class Album < ApplicationRecord
  has_many :songs

  # "Through" association: an album has many artists,
  # but not directly (not through an artist_id on the albums table),
  # but VIA its songs (because each song row DOES have an artist_id)
  has_many :artists, through: 'songs'

  # "fat models, skinny controllers"
  # You can write your own custom methods inside model classes,
  # to return custom data
  def artist
    self.artists.first
  end

end
