Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # CREATE ####################################

  # 1. New (blank) form
  get '/planets/new' => 'planets#new'   # helper will be 'planets_new_path'

  # 2. Form submits to here, AR create, redirect
  post '/planets' => 'planets#create'   # helper will be 'planets_path'

  # READ ######################################

  # 1. Index page, i.e. list every row of the 'planets' table
  get '/planets' => 'planets#index'  # uses the 'planets_path' helper to give the string '/planets'

  # 2. Show page, i.e. details about one row (one planet) by ID
  get '/planets/:id' => 'planets#show', as: 'planet'  # gives us 'planet_path' as the helper

  # UPDATE ####################################

  # 1. Pre-populated edit form (which also requires a find by ID)
  get '/planets/:id/edit' => 'planets#edit', as: 'planet_edit' # helper will be

  # 2. Edit form submits to here, AR update, redirect
  post '/planets/:id' => 'planets#update'


  # DESTROY ####################################

  # Find a row by id and delete it
  get '/planets/:id/destroy' => 'planets#destroy', as: 'planet_destroy' # helper: planet_destroy_path

end
