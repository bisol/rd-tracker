require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get users_url
    assert_response :success
    assert_select ".app-header", "Listing users"
  end

  test "should get user" do
    user = User.find_by_userid("userid_2")
    get "/users/" + user.id.to_s
    assert_response :success
    assert_select ".app-header", "Details for user " + user.userid
  end

  test "should not set user email (missing)" do
    get new_user_url
    assert_response(400)
  end

  test "should not set user email (no local address)" do
    get new_user_url params: { email: "@test.com" }
    assert_response(400)
  end

  test "should not set user email (no domain)" do
    get new_user_url params: { email: "test" }
    assert_response(400)
  end

  test "should set user email" do
    get root_url params: { fp: "userid_3" }
    get new_user_url params: { email: "test@test.com" }
    user = User.find_by_userid("userid_3")
    assert_equal "test@test.com", user.email, "Failed to update user email"
  end
end
