require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test "should not save user without userid" do
    user = User.new
    assert_not user.save, "Saved the user without an userid"
  end

  test "should save user" do
    user = User.new
    user.userid = "test"
    assert user.save, "Failed to save the user"
  end

  test "should find an user visits" do
    user = User.find_by_userid("userid_2")
    assert_not_empty user.user_visits, "Failed to find user visits"
  end
end
