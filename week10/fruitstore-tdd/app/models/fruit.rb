class Fruit < ApplicationRecord

  belongs_to :shelf

  validates :name, presence: true  #, uniqueness: true
  # validates_presence_of :name, :type

  def squishy?
    false
  end

end
