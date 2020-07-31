
require 'sinatra'
require 'sinatra/reloader'
require 'pry'  # for debugging
# require 'sqlite3'  # so we can talk to our SQL database

require 'active_record'

# Set up the ActiveRecord DB connection
ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',      # What kind of DB format is this?
  database: 'database.db'  # Where is the actual DB data?
)

# Tell ActiveRecord how to talk to our specific 'animals' table
# ... you have to use the singular capitalised version of the sql table name
class Animal < ActiveRecord::Base
  # nothing to put here! (yet)
  # ...this Animal class inherits all its functionality from ActiveRecord::Base

  has_many :spotters  # this is the "many" side of the one-to-many association
end

class Spotter < ActiveRecord::Base

  belongs_to :animal  # this is the "one" side of the one-to-many association
end



# Code inside an 'after' block is run by Sinatra after any other route handler runs
after do
  # Clean up after ourselves - close the database connection after each route is handled
  ActiveRecord::Base.connection.close
end

# Let's play with ActiveRecord
# binding.pry




# Home page route
get "/" do
  erb :'animals/home'
end # /

# CRUD System for Animals

# Create #######################################################

# 1. Show a blank for where animal details can be added

get "/animals/new" do
    erb :'animals/new'
end # /animals/new

# 2. Form submits to the action route
post "/animals" do
  # insert_sql = "INSERT INTO animals (name, species, description, roundness, alive, age, image_url)
  #   VALUES(
  #     '#{ params[:name] }',
  #     '#{ params[:species] }',
  #     '#{ params[:description] }',
  #     #{ params[:roundness] },
  #     #{ params[:alive] },
  #     #{ params[:age] },
  #     '#{ params[:image_url] }'
  #   );"
  #
  #   # execute the query and ignore the result (i.e. assume it worked LOL!)
  #   db_query insert_sql

  # Rails has an even shorter way to write this, to get rid of the key repetition
  Animal.create(
    name: params[:name],
    species: params[:species],
    description: params[:description],
    roundness: params[:roundness],
    alive: params[:alive],
    age: params[:age],
    image_url: params[:image_url]
  )


    # redirect to the index page of all animals - from there we can see
    # that the animal was added successfully... and the redirect also prevents
    # a user reload from duplicating (re-inserting) this animal into the DB
    redirect '/animals'

end # post /animals


# Read #########################################################

# 1. Index - list all rows in the table

get "/animals" do
  # Get all animals from the DB using 'SELECT'
  # @results = db_query 'SELECT * FROM animals;'
  @results = Animal.all

  erb :'animals/index'
end # /animals

# 2. Detail (show) - show all the info for a single row

get "/animals/:id" do
  # @animal = db_query "SELECT * FROM animals WHERE id = #{ params[:id] };"
  # @animal = @animal.first
  @animal = Animal.find params[:id]

  erb :'animals/show'
end # /animals/:id


# Update (edit) ################################################

# 1. Show a form which is pre-filled with the column values for that row
get "/animals/:id/edit" do
  # @animal = db_query "SELECT * FROM animals WHERE id = #{ params[:id] };"
  # @animal = @animal.first
  @animal = Animal.find params[:id]


  erb :'animals/edit'
end  # /animals/:id/edit

# 2. Edit form submits to this action route
post "/animals/:id" do

  # update_sql = "UPDATE animals SET
  #     name = '#{ params[:name] }',
  #     species = '#{ params[:species] }',
  #     description = '#{ params[:description] }',
  #     roundness = #{ params[:roundness] },
  #     alive = #{ params[:alive] },
  #     age = #{ params[:age] },
  #     image_url = '#{ params[:image_url] }'
  #   WHERE id = #{ params[:id] } ;"
  #
  # db_query update_sql

  # first we need to retrieve from the table the item we want to change
  animal = Animal.find( params[:id] )

  # now that we have the item (returned by .find, saved into 'animal')
  # we can call the update() method on it to change all its columns at once
  animal.update(
    name: params[:name],
    species: params[:species],
    description: params[:description],
    roundness: params[:roundness],
    alive: params[:alive],
    age: params[:age],
    image_url: params[:image_url]
  )

  # redirect to the show page, using the ID from the current URL
  redirect "/animals/#{ params[:id] }"

end # /animals/:id

# Delete #######################################################

# 1. Delete the specified row
get "/animals/:id/delete" do
  # db_query "DELETE FROM animals WHERE id = #{ params[:id] } ;"
  Animal.destroy params[:id]

  # No template to show, redirect to the index
  redirect '/animals'
end # /animals/:id/delete


###################################################################
###################################################################

# Spotter routes

# Create ##########################

# 1. Show a blank form:  GET /spotters/new

# 2. Form submits to here, and we do a DB create: POST /spotters


# Read ############################

# 1. Index of all rows/items in the table:  GET /spotters
get "/spotters" do
  @spotters = Spotter.all
  erb :'spotters/index'
end # /spotters index

# 2. Show page - details for one row/item: GET /spotters/:id


# Update ##########################

# 1. Show a pre-populated form with the details for one row/item:  GET /spotters/:id/edit

# 2. Edit form submits here, and we do a DB update: POST /spotters/:id


# Delete

# Delete a specific row/item from the DB by ID:  GET /spotters/:id/delete
