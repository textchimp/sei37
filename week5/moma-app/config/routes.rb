Rails.application.routes.draw do

  # Artists CRUD

  # CREATE

  # 1. Blank form
  get '/artists/new' => 'artists#new', as: 'new_artist'
  # this is what Rails will give us later when we use the one-line CRUD route helper

  # 2. Form submit, create, redirect to index
  post '/artists' => 'artists#create'   # path helper will be 'arists_path', same as index

  # READ

  # 1. Index page of all artists
  get '/artists' => 'artists#index'

  # 2. Show page for a single artist by ID
  # "as: 'artist'" tells rails to make the path
  # helper method with the name 'artist_path'
  get '/artists/:id' => 'artists#show', as: 'artist'

  # UPDATE
  # 1. Pre-filled form for a specific artist by ID
  get '/artists/:id/edit' => 'artists#edit', as: 'edit_artist'

  # 2. Form submit, update artist, redirect to show
  patch '/artists/:id' => 'artists#update'

  # DESTROY
  # Destroy artist row by ID, redirect to index
  delete '/artists/:id' => 'artists#destroy'


  # Work CRUD routes:
  resources :works

end
