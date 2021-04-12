class Appointment < ApplicationRecord
  validates :schedule, presence: true

  belongs_to :user
  belongs_to :professional
end
