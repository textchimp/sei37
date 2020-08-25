Rails.application.routes.draw do

  # API routes

  # index of secrets (React AJAX request)
  get '/secrets' => 'secrets#index'

  # create a new secret (via the React AJAX form submit)
  post '/secrets' => 'secrets#create'


end
