require 'date'

class UserVisitsController < ApplicationController

  # creates a new visit entry for the current user
  def new 
    unless params[:p] then
      render plain: "no path", :status => 400
      return
    end
    unless params[:ts] then
      render plain: "no timestamp", :status => 400
      return
    end

    @userId = session[:current_user_id]
    @user = User.find(@userId)
    @userVisit = UserVisit.new()
    @userVisit.user = @user
    @userVisit.path = params[:p]
    @userVisit.timestamp = DateTime.strptime(params[:ts], '%s')
    @userVisit.save
    render :json => @userVisit
  end
end
