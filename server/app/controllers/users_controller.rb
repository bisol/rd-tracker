require 'mail'
require 'securerandom'

# displays and updates users
# user creation is handled by WelcomeController
class UsersController < ApplicationController
  before_action :set_locale

  # render a view listing all known users
  def index
    @users = User.all
  end

  # render user details
  def show
    @user = User.find(params[:id])

    # avoid displaying empty string for user email
    if @user.email
      @email_safe = @user.email
    else
      t = I18n.t('users.email.empty')
      @email_safe = t
      logger.debug @email_safe
    end
  end

  # despite the name, this will actually update an user created by the tracker.
  # the user should not know this, so from his perspective it is creating a new entry
  def new
    unless params[:email] then
      render plain: "no email", :status => 400
      return
    end

    # email format validation. we should also validate the MX, or use an external service (neverbounce.com, apilayer.com)
    begin
      email = Mail::Address.new(params[:email])
      unless email.domain
        # this gem accepts email addresses without domain
        render plain: "invalid email", :status => 400
      return
      end
    rescue Mail::Field::ParseError
      render plain: "invalid email", :status => 400
      return
    end

    @user = User.find(session[:current_user_id])
    @user.email = email.address
    @user.save
    render :json => @user
  end

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
end
