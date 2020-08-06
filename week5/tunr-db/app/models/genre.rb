class Genre < ApplicationRecord
  # Define a many-to-many assocation!
  # This will cause ActiveRecord to look for a 'genres_songs' table
  # with a 'song_id' column and a 'genre_id' column,
  # to let us connect many songs and many genres
  has_and_belongs_to_many :songs

  has_many :artists, through: 'songs'
end
