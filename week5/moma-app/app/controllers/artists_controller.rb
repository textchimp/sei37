class ArtistsController < ApplicationController



  # READ #############################

  # 1. Index of artists
  def index
    @artists = Artist.all
  end

  # 2. Show page for an artist, by ID
  def show
    @artist = Artist.find params[:id]
  end




end  # ArtistsController
