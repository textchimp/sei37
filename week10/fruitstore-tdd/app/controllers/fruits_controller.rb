class FruitsController < ApplicationController
  def new
  end

  def create
    @fruit = Fruit.create fruit_params  # use strong params

    if @fruit.persisted?
      redirect_to @fruit   # i.e. use fruit_path(fruit) to get the URL
    else
      # validation error
      # render instead of redirecting to /fruits/new, so the form
      # will be prefilled with whatever fields were filled out
      # from the previous attempt, via @fruit - which will also
      # contain validation error messages in @fruit.errors.full_messages
      render :new
    end

  end

  def index
    # render :edit
    @fruits = Fruit.all.reverse

    # render json: @fruits
    respond_to do |format|
      format.html  # do the default :index template rendering
      format.json { render json: @fruits }
    end

  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy

  end

  private

  def fruit_params
    params.require(:fruit).permit(:name, :shelf_id)
  end


end
