class FlightsController < ApplicationController
  def index
    render json: Flight.all
  end

  # GET /flights/:id
  def show
    # render json: Flight.find( params[:id] ),
    #   include: [ :airplane, :reservations  ],
    #   except:  [ :created_at, :updated_at  ],
    #   methods: [ :departure_date_formatted ]

    render json: Flight.find( params[:id] ),
      except:  [ :created_at, :updated_at  ],
      methods: [ :departure_date_formatted ],
      include: {
        airplane: { only: [:name, :rows, :cols] },
        reservations: {
          include: {
            user: { only: [:name] }
          },
          except: [:created_at, :updated_at]
        } # reservations
      }

  end

  def search
    # sleep 3  # simulate slow connection
    results = Flight.where(origin: params[:origin], destination: params[:destination])
    # include: [:airplane]
    render json: results, include: {
      airplane: { only: [:name] }
    },
    except: [:created_at, :updated_at, :airplane_id],
    methods: [:departure_date_formatted] # include the result of running this method
  end

end
