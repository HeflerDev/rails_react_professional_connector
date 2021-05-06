class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :username, format: { with: /\A\w+/, message: 'Must be a word character' }

  has_many :appointments
  has_many :professionals, through: :appointments
end
