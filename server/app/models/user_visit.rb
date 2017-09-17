class UserVisit < ApplicationRecord
  validates :path, presence: true
  validates :timestamp, presence: true
  belongs_to :user
end
