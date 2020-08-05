class ArtistsController < ApplicationController

  # CREATE ###########################

  # 1. Blank form
  def new
    # Create a new empty object to give to 'form_for' in the template
    # - this object does not exist yet in the database! Just in Ruby memory
    @artist = Artist.new
  end

  # 2. Form submit, create, redirect
  def create
    # TODO: check for validation errors? Does .create return an object, or false?
    Artist.create artist_params # use strong params to filter the form fields being saved
    redirect_to artists_path   # no template, go back to the index '/artists'
  end

  # READ #############################

  # 1. Index of artists
  def index
    @artists = Artist.all
  end

  # 2. Show page for an artist, by ID
  def show
    @artist = Artist.find params[:id]
  end

  # UPDATE ######################################

  # 1. Pre-filled edit form
  def edit
    @artist = Artist.find params[:id]
  end

  # 2. Form submit, perform update, redirect to show page
  def update
    artist = Artist.find params[:id]

    # Use the same strong params method we used in the create action, for this update:
    artist.update artist_params

    # No template for updates; redirect to the show page (using the path helper)
    redirect_to( artist_path(params[:id]) )

  end # update

  # DESTROY #######################################

  def destroy
    Artist.destroy params[:id]
    redirect_to artists_path
  end




  private
  # ^ private means the following methods (until the end of the class)
  #   are NOT actions, i.e. they do not correspond to routes

  # Strong params! Acts like a doorman with a door list, only letting through
  # the specified form param fields, so we can add them to our table
  def artist_params
    params.require(:artist).permit( :name, :nationality, :dob, :period, :roundness, :bio, :image )
  end


end  # ArtistsController
