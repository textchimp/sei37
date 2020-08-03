Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # STOCKS

  # 1. Blank form
  get '/stocks' => 'stocks#form'

  # 2. Form submits to here to do lookup and print results
  get '/stocks/lookup' => 'stocks#lookup'


  # MOVIES

  # 1. Blank form for entering movie search text
  get '/movies' => 'movies#form'

  # 2. Form submits to here, do lookup using HTTParty, and print LIST
  #    results to the template using an .each loop inside the template
  get '/movies/search' => 'movies#search'

  # 3. Turn each result from the loop into an <a> tag, with an href=""
  #    that looks like "/movie/THE_ID_GOES_HERE" - handle this with a
  #    new route in your routes.rb and make ANOTHER, DIFFERENT HTTParty URL
  #    request to api.themoviedb.org to get the details for a specific movie by ID,
  #    and show the detailed movie info on the final 'show page' template

  # 4. Show a poster for each movie result! You will need :poster_path PLUS
  #    a base URL which you will have to google to find




end
