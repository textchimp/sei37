
class PlanetsController < ApplicationController

  skip_before_action :verify_authenticity_token, raise: false

  # CREATE ##################################

  # 1. Show blank form
  def new
  end

  # 2. Form submits to here
  def create

    Planet.create(
      name:     params[:name],
      orbit:    params[:orbit],
      diameter: params[:diameter],
      mass:     params[:mass],
      moons:    params[:moons],
      image:    params[:image]
    )

    # Create actions have no template of their own (partly to avoid accidental)
    # resubmission of form data; instead we redirect to GET '/planets' using the path helper
    redirect_to( planets_path )

  end # create


  # READ ####################################

  # 1. Index page
  def index
    @planets = Planet.all
  end # index

  # 2. Show/details page for a single item, looked up by its ID
  #    The route file says "get /planets/:id", so we can find the
  #    specific ID inside params, with that key: params[:id]
  def show
    @planet = Planet.find params[:id]
  end # show

  # UPDATE #######################################

  # 1. Show pre-filled form
  def edit
    @planet = Planet.find params[:id]
  end  # edit

  # 2. Form submits here, do update, redirect
  def update

    planet = Planet.find params[:id]

    planet.update(
      name:     params[:name],
      orbit:    params[:orbit],
      diameter: params[:diameter],
      mass:     params[:mass],
      moons:    params[:moons],
      image:    params[:image]
    )

    # No template for the Update action either, redirect back to the show page
    redirect_to( planet_path(params[:id]) )

  end # update

  # DESTROY ###########################################
  def destroy
    Planet.destroy params[:id]
    redirect_to( planets_path )  # No template, redirect to '/planets' index
  end  # destroy


end # PlanetsController
