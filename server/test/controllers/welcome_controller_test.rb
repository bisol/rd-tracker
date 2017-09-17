require 'test_helper'

class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test "should set user id in session" do
    get root_url params: { fp: "userid_4" }
    assert_response :success
    user = User.find_by_userid("userid_4")
    assert_equal user.id, session[:current_user_id]
  end
end
