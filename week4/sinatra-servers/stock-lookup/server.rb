require 'sinatra'
require 'sinatra/reloader'
require 'stock_quote'

# 1. Show blank form
get "/" do
  erb :form
end

# 2. Form submits to here
get "/lookup" do

  params.to_s

  StockQuote::Stock.new(api_key: 'pk_16a849fd637243a79fff90fa4d42bc5d')
  stock = StockQuote::Stock.quote params[:stock_symbol]
  # require 'pry'; binding.pry

  @stock_price = stock.latest_price
  @company = stock.company_name

  # we are going to loop over this
  # array in the result.erb template,
  # to see what a template loop looks
  # like
  
  @names = [
    'Zara',
    'Jam',
    'Ryan'
  ]

  erb :result

end # /lookup
