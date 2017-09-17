class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_cors

  private

  def set_cors
    @origin = request.headers["Origin"]
    response.set_header("Access-Control-Allow-Origin", @origin)
    response.set_header("Access-Control-Allow-Credentials", "true")
  end
end
