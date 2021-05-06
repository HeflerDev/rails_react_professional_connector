require 'rails_helper'
require 'bcrypt'

RSpec.describe Professional, type: :model do
  context 'when validating user'

  before(:each) do
    @valid_professional = {
      category: 'Developer',
      name: 'Title Name Surname',
      description: 'Content Here',
      image: 'image_string',
      hourly_wage: 100,
      currency: 'USD',
      phone_number: 555-0123,
      email: 'email@email.com',
      working_days: 'Mon-Fry'
    }
  end

  it 'is valid with valid attributes' do
    expect(Professional.new(@valid_professional)).to be_valid
  end

  it 'doesn\'t save if empty' do
    expect(Professional.new).to_not be_valid
  end

  it 'don\'t save invalid email' do
    @valid_professional['email'] = 'something_else'
    expect(Professional.new(@valid_professional)).to_not be_valid
    @valid_professional['email'] = ' something@something'
    expect(Professional.new(@valid_professional)).to_not be_valid
    @valid_professional['email'] = '$%^&something@something'
    expect(Professional.new(@valid_professional)).to_not be_valid
    @valid_professional['email'] = 'something@something'
    expect(Professional.new(@valid_professional)).to_not be_valid
  end
end
  
