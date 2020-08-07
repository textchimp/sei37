class MixtapesController < ApplicationController

  # Let's decide that all the mixtape-modifying pages require a user
  # to be logged in (because mixtapes belong_to users)
  # BUT you don't have to be logged in to see the index of mixtapes
  # or to view the details of a specific mixtape
  before_action :check_if_logged_in, except: [ :index, :show ]

  def new
    @mixtape = Mixtape.new
  end

  def create
    # Create mixtape, and associate it with the logged-in user
    @mixtape = Mixtape.new mixtape_params
    # 1. set user_id and save (we used .new above, so only one DB query)
    @mixtape.user_id = @current_user.id
    @mixtape.save

    # 2. use update method
    # @mixtape.update user_id: @current_user.id

    # 3. add from the user end of the association, using '<<'
    # @current_user.mixtapes << @mixtape



    redirect_to mixtapes_path
  end

  def index
    @mixtapes = Mixtape.all
  end

  def show
    @mixtape = Mixtape.find params[:id]  # from /mixtapes/:id
  end

  def edit
    @mixtape = Mixtape.find params[:id]

    # Make sure AGAIN that this mixtape belongs to the logged-in user
    # (because any user could work out the edit URL format and fake it)
    redirect_to mixtapes_path unless @mixtape.user == @current_user
  end

  def update

    # You should use an instance var '@mixtape' if your model has
    # validations and the update might fail for validation reasons
    # ... then you'd want to 'render :edit' when it fails,
    # and the form_for will get @mixtape so it can pre-populate the fields
    # and list any errors
    mixtape = Mixtape.find params[:id]

    # Check YET AGAIN that the mixtape belongs to the logged-in user
    # (because users can mess with the IDs in form action URLs)
    if mixtape.user != @current_user
      redirect_to mixtapes_path
      return  # leave the function early!! i.e. don't do the update below
    end

    mixtape.update mixtape_params  # actually perform the update using the strong params

    redirect_to mixtape_path(mixtape) # you can leave off .id when you pass an object
  end

  def destroy
  end

  private

  def mixtape_params
    params.require( :mixtape ).permit( :title, :image )
  end

end # MixtapesController
