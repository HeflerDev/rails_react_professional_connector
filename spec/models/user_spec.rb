require 'rails_helper'
require 'bcrypt'

RSpec.describe User, type: :model do
  it 'is valid with valid attributes' do
    user = User.new
    user.username = 'Sample'
    user.password_digest = BCrypt::Password.create('password')
    expect(user).to be_valid
  end

  it 'is not valid with invalid username' do
    expect(User.new(username: '*invalid_username')).to_not be_valid
    expect(User.new(username: '&invalid_username')).to_not be_valid
    expect(User.new(username: 'invalid username')).to_not be_valid
    expect(User.new(username: '')).to_not be_valid
  end
end
