# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

print "Creating songs... "
Song.destroy_all

s1 = Song.create! title: 'Achy Breaky Heart'
s2 = Song.create! title: 'Have a Safe Trip, Dear'
s3 = Song.create! title: 'Burn the Witch'
s4 = Song.create! title: 'Identikit'

puts "created #{ Song.count } songs."


print "Creating artists... "
Artist.destroy_all

ar1 = Artist.create! name: 'Billy Ray Cyrus'
ar2 = Artist.create! name: 'June of 44'
ar3 = Artist.create! name: 'Radiohead'

puts "created #{ Artist.count } artists."


print "Creating albums... "
Album.destroy_all

al1 = Album.create! title: 'Some Gave All', year: '1992'
al2 = Album.create! title: 'Engine Takes to the Water', year: '1998'
al3 = Album.create! title: 'A Moon-Shaped Pool', year: '2015'

puts "created #{ Album.count } albums."


# Create associations from Songs to Artists:

# 'Achy Break Heart' belongs to 'Billy Ray Cyrus'
ar1.songs << s1

# 👆 Reminder: ActiveRecord re-purposes the '<<' Ruby array push operator
# to let us add associations from the many side

# 'Have a Safe Trip, Dear' (s2) belongs to 'June of 44' (ar2)
ar2.songs << s2

# Both 'Burn the Witch' (s3) and 'Identikit' (s4) belong to 'Radiohead' (ar3)
ar3.songs << s3 << s4

# Create associations from Songs to Albums
al1.songs << s1  # 'Achy Breaky Heart' (s1) is on the album 'Some Gave All' (al1)
al2.songs << s2  # 'Have a Safe Trip, Dear' (s2) is on the album 'Engine Takes to the Water' (al2)
al3.songs << s3 << s4  # 'Burn the Witch' (s3) and 'Identikit' (s4) are on 'Moon-Shaped Pool' (al3)

puts "Testing associations:"
print "Songs by #{ Artist.last.name }: "
puts Artist.last.songs.pluck(:title).join(', ')

puts "The song '#{ Song.first.title }' is by #{ Song.first.artist.name }"

print "The album '#{ al3.title }' has the songs: "
puts al3.songs.pluck(:title).join(', ')


Genre.destroy_all

g1 = Genre.create! name: 'Nautical Rock'
g2 = Genre.create! name: 'Math Rock'
g3 = Genre.create! name: 'Paranoid Art-Rock'
g4 = Genre.create! name: 'Country'
g5 = Genre.create! name: 'Sadcore'
g6 = Genre.create! name: 'IDM'

puts "Created #{ Genre.count } genres."

# Create Genres <-> Songs associations (many-to-many):

# In the table 'genres_songs', create a new row with song_id = s1.id, genre_id = g4.id
s1.genres << g4

# This one create two rows in 'genres_songs':
# song_id = s2.id, genre_id = g1.id
# song_id = s2.id, genre_id = g2.id
s2.genres << g1 << g2

s3.genres << g3 << g5
s4.genres << g3 << g5 << g6

puts "Testing genre associations:"

print "Genre '#{ g3.name}' has songs: "
puts g3.songs.pluck(:title).join(', ')

print "Song '#{ s4.title }' has genres: "
puts s4.genres.pluck(:name).join(', ')

Mixtape.destroy_all

m1 = Mixtape.create! title: 'Driving Songs'
m2 = Mixtape.create! title: 'Lockdown Blues'
m3 = Mixtape.create! title: 'Code Jams'

puts "Created #{ Mixtape.count } mixtapes."

# Mixtapes <-> Songs many-to-many associations
m1.songs << s1 << s2 << s3 << s4
m2.songs << s1 << s4
m3.songs << s2 << s3

puts "Testing mixtape associations:"
print "The mixtape '#{ m1.title }' has songs: "
puts m1.songs.pluck(:title).join(', ')


User.destroy_all

u1 = User.create! email: 'luke@ga.co', password: 'chicken', name: 'Luke'
u2 = User.create! email: 'mikaela@ga.co', password: 'chicken', name: 'Mikaela'
u3 = User.create! email: 'zara@ga.co', password: 'chicken', name: 'Zara'

puts "Created #{ User.count } users."

# User -> Mixtapes one-to-many associations:
u1.mixtapes << m1 << m2
u2.mixtapes << m3

print "User #{ User.first.name } has mixtapes: "
puts User.first.mixtapes.pluck(:title).join(', ')
