# "We want to use the sinatra gem in the following code"
# ... similar to loading JS files using <script src=""> tags
require 'sinatra'
require 'sinatra/reloader' # reload the server automatically on changes

# Define some 'routes' that this new webserver will respond to
#
# i.e. when you see a specific request, such as a request for the
# root page "/", what should you respond with? We will be responding
# by sending strings of text back to the browser
#
# We don't care about the domain here! i.e. "http://ga.co" - we are
# already on the server!
#
# We only care about the path - the part that starts with the first '/'
# until the end (or until the start of the params), i.e.
# "http://ga.co/about/jobs" - we just care about the path "/about/jobs"

# Respond to requests to the site root aka 'home page': "/"
get "/" do

  # Whatever the last line of this block evaluates to,
  # THAT is what gets sent back to the browser as the response

  puts "Serving up the root page!"

  # The last line is what gets returned:
  "<h1>Hello World from this fantastic site! Thanks for visiting!</h1>"

end  # end get "/"


# Respond to requests to the path "/luckynumber"
get "/luckynumber" do

  # num is a local variable of the block
  # - NOT visible in the .erb template

  # Promote this local variable to an
  # "instance variable" by giving it a
  # cute little hat '@' - now it will
  # be visible in the .erb template
  @num = rand 100

  # puts "The random number is #{@num}"

  # "Your lucky number is: #{ num }"
  erb :lucky    # look for views/lucky.erb

end  # end get "/luckynumber"


# Respond to the "/uptime" route
get "/uptime" do
  output = `uptime`  # run the command inside the backticks, and return the output

  "System uptime: #{output}"
end  # end get "/uptime"


# Respond to any request that starts with "/hello/SOMETHING"
get "/hello/:student" do

  hello_recipient = params[ :student ]  # get the actual value that came after "/hello/"

  "Hello, #{ hello_recipient }"

end # end get "/hello/..."


# Match a URL like "/hello/swaroop/curious"
get "/hello/:person/:mood" do

  # "Hello, #{ params[:person] }. Your mood is: #{ params[:mood] }"
  erb :mood_ring

end # end get "/hello/:person/:mood"
