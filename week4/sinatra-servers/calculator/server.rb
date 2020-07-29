# Load the sinatra libraries (gems)
require 'sinatra'
require 'sinatra/reloader'

get "/" do
  erb :intro
end # /

# Match any url of the form:
# /calc/200/*/121
get "/calc/:first/:op/:second" do

  @first = params[:first].to_f
  @op = params[:op]
  @second = params[:second].to_f

  p params

  # if @op == '+'
  #   @result = @first + @second
  # elsif @op == '-'
  #   @result = @first - @second
  # elsif @op == '*'
  #   @result = @first * @second
  # elsif @op == 'div'
  #   @result = @first / @second
  # end

  @result = case @op
  when '+'   then @first + @second
  when '-'   then @first - @second
  when '*'   then @first * @second
  when 'div' then @first / @second
  else
    "Invalid operator"
  end


  erb :calc
end


# 1. Display the empty calc form
get "/calc" do
  p params
  erb :form
end  # /calc

# 2. Catch the submitted form, do the
#    calcuation, and print the results
get "/calc/result" do
   # "First number: #{ params[:firstnum] }, Second number: #{ params[:secondnum] }"

   @first = params[:firstnum].to_f
   @op = params[:operator]
   @second = params[:secondnum].to_f

   @result = case @op
   when '+'   then @first + @second
   when '-'   then @first - @second
   when '*'   then @first * @second
   when 'div' then @first / @second
   else
     "Invalid operator"
   end

   erb :calc

end  # /calc/result
