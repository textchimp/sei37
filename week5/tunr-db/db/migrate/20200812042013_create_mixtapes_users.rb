class CreateMixtapesUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :mixtapes_users do |t|
      t.integer :user_id
      t.integer :mixtape_id
    end
  end
end
