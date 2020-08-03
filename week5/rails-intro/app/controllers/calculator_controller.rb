
class CalculatorController < ApplicationController

  def home
  end

  def do_calculation
    # raise 'hell'

    @first = params[:first_num].to_f
    @op    = params[:op]
    @second = params[:second_num].to_f

    # @result = case @op
    # when '+'   then @first + @second
    # when '-'   then @first - @second
    # when '*'   then @first * @second
    # when 'div' then @first / @second
    # when '**'  then @first ** @second
    # else
    #   "Bad operator"
    # end

    # The reason this works is that 1 + 2 in Ruby is actually 1.+( 2 )
    # which can be rewritten as 1.send( '+', 2 )
    @result = @first.send( @op, @second )

  end


end # CalculatorController
