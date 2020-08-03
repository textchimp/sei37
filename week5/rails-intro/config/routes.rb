Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # get '/' (root page of the site) is written as:
  root to: 'pages#information'

  #VERB  PATH     CONTROLLER # METHOD ('action')
   get '/info' => 'pages#information'

   get '/funny' => 'pages#funny'

   # Match URLs like '/hello/zara', '/hello/danny' etc
   # a.k.a. "Dynamic Paths"
   get '/hello/:recipient' => 'pages#say_hello_to'


   # Calculator routes:

   # 1. Blank form
   get '/calc' => 'calculator#home'

   # 2. Form submits to here (using a GET request), shows result
   get '/calc/answer' => 'calculator#do_calculation'


end
