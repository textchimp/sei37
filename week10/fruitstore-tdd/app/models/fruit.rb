class Fruit < ApplicationRecord

  belongs_to :shelf

  def squishy?
    false
  end

end
