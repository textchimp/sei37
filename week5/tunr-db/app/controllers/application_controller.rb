class ApplicationController < ActionController::Base

  # This will cause say_hello to run before ANY action of ALL controllers
  before_action :fetch_user

  def fetch_user

    # Check if the user_id in the session is the ID of a real
    # user in our database: if it is, we will get the user object
    # in @current_user; if not, we will get nil
    if session[:user_id].present?
      @current_user = User.find_by id: session[:user_id]
    end

    # If we did get nil from the above query, delete the session
    # because the user_id is stale (invalid)
    session[:user_id] = nil unless @current_user.present?
  end # fetch_user


  def check_if_logged_in
    # If the current browser user is not logged in,
    # this method redirects them to the login page;
    # we can call this method for any specific controller
    # actions that require a user to be logged in, to
    # lock down those routes
    redirect_to login_path unless @current_user.present?
  end


end # ApplicationController
