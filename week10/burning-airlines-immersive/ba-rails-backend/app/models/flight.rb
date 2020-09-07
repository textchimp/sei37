class Flight < ApplicationRecord
  belongs_to :airplane, optional: true
  has_many :reservations
  has_many :users, through: 'reservations'

  def departure_date_formatted
    departure_date.strftime("%d %b %Y, %I:%M%P")
  end

end
