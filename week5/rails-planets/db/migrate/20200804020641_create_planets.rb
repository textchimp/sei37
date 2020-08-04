class CreatePlanets < ActiveRecord::Migration[5.2]
  def change

    # SQL: CREATE TABLE planets ( name TEXT, moons INTEGER,  )
    # Instead of writing SQL, we use a Ruby style for creating tables -
    # this abstacts away from the underlying database, making it
    # easy to swap one database format for another

    create_table :planets do |t|

      # NO NEED to create an :id column - it's so essential that
      # Rails always automatically creates it for us

      t.string  :name    # a string column to store the planet's name
      t.text    :image   # a longer text column for the image URL
      t.float   :orbit   # a float for the orbit time (relative to earth's orbit)
      t.float   :diameter
      t.float   :mass
      t.integer :moons
    end

  end
end
