# tracker entry point
class WelcomeController < ApplicationController

  # creates a new user entry, or return the one associated with supplied fingerprint
  # used to initialize the tracker
  def index
    @userid = params[:fp]
    if (!@userid) then
      # the tracker lib failed, let's creatre a random user id
      @userid = SecureRandom.uuid
    end

    @user = User.find_by_userid(@userid)
    if (!@user) then
      @user = User.new()
      @user.userid = @userid
      @user.save
    end

    session[:current_user_id] = @user.id
    render :json => @user
  end
end
