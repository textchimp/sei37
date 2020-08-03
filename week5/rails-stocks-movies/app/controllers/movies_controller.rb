
class MoviesController < ApplicationController

  # 1. Show the blank form ( /movies )
  def form
  end # form

  # 2. Form submits to here, to perform search using HTTParty
  #    and display results in the app/views/movies/search.html.erb template
  def search

    @query = params[:search_text]

    @results = HTTParty.get "https://api.themoviedb.org/3/search/movie?api_key=24d863d54c86392e6e1df55b9a328755&query=#{ @query }"

    # raise 'hell'

  end # search

end # MoviesController
