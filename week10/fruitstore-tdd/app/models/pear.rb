class Pear < Fruit
  # STI: Single Table Inheritance in Rails:
  # create one base class that corresponds to a
  # database table (Fruit, and 'fruits'), and
  # then multiple child ('derived') classes
  # that inherit from that base class -
  # all the child class' records are stored
  # in the base class table, 'fruits'

  # Override the definition of this method from
  # the parent class; the parent returns false,
  # but we are customising the answer for pears,
  # so this version returns true

  validates :name, presence: true, uniqueness: true

  def squishy?
    true
  end

end
