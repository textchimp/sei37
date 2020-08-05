class WorksController < ApplicationController

  # CREATE

  def new
    @work = Work.new  # new empty object in memory (not DB) to give to form_for
  end

  def create
    Work.create work_params  # strong params
    redirect_to works_path   # redirect to /works (index)
  end

  # READ

  def index
    @works = Work.all
  end

  def show
    @work = Work.find params[:id]
  end

  def edit
    @work = Work.find params[:id]
  end

  def update
    work = Work.find params[:id]
    work.update work_params

    redirect_to( work_path(params[:id]) )
  end

  def destroy
    Work.destroy params[:id]
    redirect_to works_path
  end

  private

  def work_params
    params.require( :work ).permit( :title, :year, :medium, :style, :image, :artist_id )
  end

end # WorksController
