class User < ApplicationRecord
  validates :userid, presence: true
  has_many :user_visits
end
