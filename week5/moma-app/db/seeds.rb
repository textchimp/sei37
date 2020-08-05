# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Creating artists..."

Artist.destroy_all

krasner = Artist.create!(
  name: 'Lee Krasner',
  nationality: 'USA',
  dob: '1908/10/27',  # must use the right format for dates!
  period: '20th Century',
  image: 'https://i.pinimg.com/736x/05/62/14/0562148ce05f206e7ad773dc65d565bc--lee-krasner-abstract-expressionism.jpg',
  roundness: 5,
  bio: 'Abstract Expressionist'
)

kupka = Artist.create!(
  name: 'Frantisek Kupka',
  nationality: 'Czech',
  dob: '1871/09/23',
  period: '19th/20th Century',
  image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Frantisek_Kupka_1928.jpg',
  roundness: 6,
  bio: 'Vorticist/Abstract'
)

ernst = Artist.create! name: 'Max Ernst', nationality: 'German', dob: '1891/04/02', period: '20th Century', image: 'http://www.max-ernst.com/images/max-ernst-photo.jpg', roundness: 7, bio: 'Surrealist'

puts "Created  #{ Artist.count } artists:"
puts Artist.pluck(:name).join(', ')




Work.destroy_all
puts "Creating works..."

# Krasner
Work.create! title: 'Gothic Landscape', year: '1961/01/01', medium: 'oil on canvas', style: 'Abstract expressionism', image: 'http://www.tate.org.uk/art/images/work/T/T03/T03291_10.jpg', artist_id: krasner.id

# Krasner
Work.create! title: 'Working Model', year: '1957/01/01', medium: 'bronze sculpture', style: 'Modernism', image: 'http://www.tate.org.uk/art/images/work/T/T00/T00390_10.jpg', artist_id: krasner.id

# Kupka
Work.create! title: 'Movement', year: '1946/01/01', medium: 'oil on canvas', style: 'Abstract expressionism', image: 'http://www.tresbohemes.com/wp-content/uploads/2016/04/Kupka-Movement.jpg', artist_id: kupka.id

# Ernst
Work.create! title: 'City with Animals', year: '1930/01/01', medium: 'oil on wood', style: 'Surrealism/cubism', image: 'https://i0.wp.com/www.guggenheim.org/wp-content/uploads/1914/01/48.1172.280_web.jpg?w=870', artist_id: ernst.id

# Ernst
Work.create! title: 'Die Versuchung des heiligen Antonius', year: '1946/01/01', medium: 'oil on canvas', style: 'Surrealism', image: 'http://www.dandy-club.com/wp-content/uploads/2013/01/main.jart2_.jpg', artist_id: ernst.id


puts "Created #{ Work.count } works:"
puts Work.pluck(:title).join(', ')
