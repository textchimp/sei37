Rails.application.routes.draw do

  # Frontend: a single route for our SPA interface
  get '/dashboard' => 'dashboard#app'



  # API endpoints: ################################################################

  # Sytem Uptime route:
  get '/uptime' => 'dashboard#uptime'

  # CPU Hog route:
  get '/cpuhog' => 'dashboard#cpu'

  # Index of Dogs, but JSON
  get '/dogs' => 'dashboard#dogs_index'

  # Dog search by name:
  get '/dogs/search/:query' => 'dashboard#dogs_search'

end
