class UsersController < ApplicationController

  def new
    @user = User.new  # the form_form helper needs '@user'
  end

  def create

    @user = User.create user_params

    # Check whether the above create was successful (i.e. created a
    # row in the users table, i.e. the object has an id),
    # or if it failed due to a data validation error
    if @user.persisted?
      session[:user_id] = @user.id  # log in the newly created account automatically!
      redirect_to root_path
    else
      # redirect_to new_user_path  # we're not really going to do this

      # Show the form again directly, no redirect:
      # This lets us use the failed @user create object in our template form_for,
      # which gives us access to the validation error messages,
      # and also causes the already-submitted fields of the form to be
      # re-populated for the user
      render :new
    end


  end # create


  def index
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

  def user_params
    params.require( :user ).permit( :name, :email, :password, :password_confirmation )
  end


end # UsersController
