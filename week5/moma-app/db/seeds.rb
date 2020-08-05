# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Creating artists..."

Artist.destroy_all

Artist.create!(
  name: 'Lee Krasner',
  nationality: 'USA',
  dob: '1908/10/27',  # must use the right format for dates!
  period: '20th Century',
  image: 'https://i.pinimg.com/736x/05/62/14/0562148ce05f206e7ad773dc65d565bc--lee-krasner-abstract-expressionism.jpg',
  roundness: 5,
  bio: 'Abstract Expressionist'
)

Artist.create!(
  name: 'Frantisek Kupka',
  nationality: 'Czech',
  dob: '1871/09/23',
  period: '19th/20th Century',
  image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Frantisek_Kupka_1928.jpg',
  roundness: 6,
  bio: 'Vorticist/Abstract'
)

Artist.create! name: 'Max Ernst', nationality: 'German', dob: '1891/04/02', period: '20th Century', image: 'http://www.max-ernst.com/images/max-ernst-photo.jpg', roundness: 7, bio: 'Surrealist'

puts "Created  #{ Artist.count } artists:"
puts Artist.pluck(:name).join(', ')
