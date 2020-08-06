Rails.application.routes.draw do

  root to: 'pages#welcome'
  get '/home' => 'pages#home'

  # Session routes:

  get  '/login' => 'session#new'     # login form

  # form submits here, do authentication & create session & redirect, or show form with errors
  post '/login' => 'session#create'

  delete '/login' => 'session#destroy'  # logout, i.e. delete session for this user

end
