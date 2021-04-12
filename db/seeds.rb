require 'faker'
require 'bcrypt'

100.times do
  user = User.new
  user.username = Faker::Name.name
  user.password_digest = BCrypt::Password.create('password')
  user.save
end

20.times do
  professional = Professional.new
  professional.name = Faker::Name.name
  professional.category = Faker::Company.profession
  professional.description = Faker::Lorem.sentence(word_count: 20)
  professional.image = Faker::LoremFlickr.image
  professional.hourly_wage = Faker::Number.within(range: 50...500)
  professional.currency = Faker::Currency.code
  professional.phone_number = Faker::PhoneNumber.cell_phone
  professional.email = Faker::Internet.email
  professional.working_days = 'Mon-Fry'
  professional.save
end
