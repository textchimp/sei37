
class PagesController < ApplicationController

  # THIS is the action pointed to by the config/routes.rb file where we have:
  # get '/info' => 'pages#information'
  def information
  end

  def funny
    # without needing a line line sinatra's 'erb :funny',
    # Rails automatically looks for a template file:
    #  app/views/pages/funny.html.erb
    @title = 'Hilarious Poker Dogs'
  end

  def say_hello_to
    # To get access to the string in the URL in place of ':recipient'
    # in the route '/hello/:recipient',
    # we use params:   params[:recipient]
    @hello_recipient = params[ :recipient ]
    p params
  end


end # PagesController
