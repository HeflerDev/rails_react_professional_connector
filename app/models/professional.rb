class Professional < ApplicationRecord
  validates :name, presence: true, length: { in: 6..20 }, uniqueness: true
  validates :category, presence: true, length: { minimum: 2 }
  validates :description, length: { maximum: 240 }
  validates :hourly_wage, presence: true
  validates :currency, presence: true
  validates :phone_number, presence: true, uniqueness: true, numericality: { only_integer: true }
  validates :email, presence: true, uniqueness: true, format: { with: /\A([A-Za-z]\w+)@(\w+)\.\w+\z/ }
  validates :working_days, presence: true

  has_many :appointments
  has_many :users, through: :appointments
end
