class FruitsController < ApplicationController
  def new
  end

  def create
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
end
