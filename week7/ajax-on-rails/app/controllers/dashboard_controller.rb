class DashboardController < ApplicationController

  def app
  end


  # API action
  def uptime
    @up = `uptime`

    response = {
      command: 'uptime',
      output: @up,
      numbers: [ 1, 5, 23, 420 ]  # no good reason for this
    }

    # This one controller action can respond with either HTML or JSON
    # data, depending on the format of the request (which is a HTTP browser header)
    respond_to do |format|
      format.html  # Do nothing special, i.e. render the default template as HTML
      format.json  { render json: response  }  # Render a JSON response
    end

  end # uptime


  def cpu
    hog = `ps xr`.split("\n").second
    date = `date`

    render json: {
      cpuHog: hog,
      currentDate: date
    }
  end # cpu


  def dogs_index
    render json: Dog.all
  end

  def dogs_search
    # render plain: "Your search was: #{ params[:query] }"
    render json: Dog.where( name: params[:query] )
  end



end # controller
