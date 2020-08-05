Rails.application.routes.draw do
  # Artists CRUD

  # CREATE
  # 1. Blank form
  # 2. Form submit, create, redirect to index

  # READ

  # 1. Index page of all artists
  get '/artists' => 'artists#index'

  # 2. Show page for a single artist by ID

  # UPDATE
  # 1. Pre-filled form for a specific artist by ID
  # 2. Form submit, update artist, redirect to show

  # DESTROY
  # Destroy artist row by ID, redirect to index


end
