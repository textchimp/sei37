class FlightsController < ApplicationController

  skip_before_action :verify_authenticity_token, raise: false

  FAKE_CURRENT_USER_ID = 10

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

  def reservation_create
    # use a fake user id
    # TODO: set up knock to get a real @current_user

    # TODO: check for validation failures
    reservation = Reservation.create(
      row: params[:row],
      col: params[:col],
      flight_id: params[:flight_id],
      user_id: FAKE_CURRENT_USER_ID
    )

    render json: reservation

  end

end # class FlightsController
