require 'test_helper'

class UserVisitTest < ActiveSupport::TestCase

  test "should not save visit without path" do
    visit = UserVisit.new
    visit.timestamp = DateTime.strptime('0', '%s')
    assert_not visit.save, "Saved the visit without a path"
  end

  test "should not save visit without timestamp" do
    visit = UserVisit.new
    visit.path = "/test"
    assert_not visit.save, "Saved the visit without a path"
  end

  test "should not save visit without user" do
    visit = UserVisit.new
    visit.path = "/test"
    visit.timestamp = DateTime.strptime('0', '%s')
    assert_not visit.save, "saved visit without user"
  end

  test "should save visit" do
    user = User.find_by_userid("userid_1")
    visit = UserVisit.new
    visit.user = user
    visit.path = "/test"
    visit.timestamp = DateTime.strptime('0', '%s')
    visit.save!

    fresh = UserVisit.find(visit.id)
    assert fresh, "Failed to refresh the visit"
    assert_equal fresh.path, visit.path, "wrong path"
  end
end
