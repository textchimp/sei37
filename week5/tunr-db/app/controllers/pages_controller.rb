class PagesController < ApplicationController

  # Some actions in this controller require you to be logged in:
  # to enforce that, those actions use the :check_if_logged_in
  # method defined in the parent class ApplicationController,
  # which redirects to the login page unless you're already logged in
  before_action :check_if_logged_in, only: [ :home ]

  def welcome
    # raise 'hell'
  end

  def home
    # logged-in users only from here on!
    # ...
  end

end
