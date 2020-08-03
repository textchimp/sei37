
class StocksController < ApplicationController

  def form
  end

  def lookup

    @symbol = params[:stock_code]

    StockQuote::Stock.new(api_key: 'pk_16a849fd637243a79fff90fa4d42bc5d')

    @stock = StockQuote::Stock.quote @symbol

  end


end
