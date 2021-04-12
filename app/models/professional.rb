class Professional < ApplicationRecord
  validates :name, presence: true
  validates :category, presence: true

  has_many :appointments
  has_many :users, through: :appointments
end
