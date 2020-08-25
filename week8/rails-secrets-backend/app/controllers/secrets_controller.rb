class SecretsController < ApplicationController

  skip_before_action :verify_authenticity_token, raise: false

  def index
    render json: Secret.all
  end

  def create
    secret = Secret.create content: params[:content] # from axios.post(URL, {content: 'blah' })
    # TODO: error/validation handling!
    render json: secret
  end


end
