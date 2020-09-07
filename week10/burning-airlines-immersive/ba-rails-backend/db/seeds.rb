
User.destroy_all
print "Creating Users... "
u1 = User.create! name: 'Test User 1', email: 'one@one.com', password: 'chicken'
u2 = User.create! name: 'Test User 2', email: 'two@two.com', password: 'chicken'
u3 = User.create! name: 'Test User 3', email: 'three@three.com', password: 'chicken'
puts "created #{User.all.length} users."

Airplane.destroy_all
print "Creating Airplanes... "
a1 = Airplane.create! name: '737', rows: 40, cols: 6
a2 = Airplane.create! name: '737 MAX', rows: 80, cols: 8
puts "created #{Airplane.all.length} airplanes."

Flight.destroy_all
print "Creating Flights... "
f1 = Flight.create! flight_number: 'BA256', departure_date: '2020-10-01 04:20', origin: 'SYD', destination: 'MEL', airplane_id: a1.id
f2 = Flight.create! flight_number: 'BA512', departure_date: '2020-10-02 11:20', origin: 'SYD', destination: 'MEL', airplane: a1 # same as writing 'airplane_id: a1.id'
f3 = Flight.create! flight_number: 'BA1024', departure_date: '2020-10-03 16:20', origin: 'SYD', destination: 'SIN', airplane_id: a2.id
puts "created #{Flight.all.length} flights."

Reservation.destroy_all
print "Creating reservations... "
r1 = Reservation.create! flight: f1, user: u1, row: 10, col: 2
r2 = Reservation.create! flight: f1, user: u2, row: 10, col: 3
r3 = Reservation.create! flight: f1, user: u3, row: 10, col: 4
r4 = Reservation.create! flight: f2, user: u3, row: 15, col: 1
puts "created #{Reservation.all.length} reservations."

puts
puts "Association tests:"
puts "Airplane #1 has #{ Airplane.first.flights.length } flights (should be 2)"
raise Exception.new('Airplane flights association broken') if Airplane.first.flights.length != 2
# expect( Airplane.first.flights.length ).to eq 3

puts "Flight #1 has #{ Flight.first.reservations.length } reservations (should be 3)"
puts "User #3 has #{ User.third.reservations.length } reservations (should be 2)"
puts
puts "Done."
