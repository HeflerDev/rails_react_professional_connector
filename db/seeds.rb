require 'faker'
require 'bcrypt'

100.times do
  user = User.new
  user.username = Faker::Name.name
  user.password_digest = BCrypt::Password.create('password')
  user.save
end

hefler = User.new
hefler.username = 'hefler'
hefler.password_digest = BCrypt::Password.create('hefler')
hefler.save

100.times do
  point = Appointment.new
  point.schedule = Faker::Time.between(from: DateTime.now - 1, to: DateTime.now)
  point.user_id = 101
  point.professional_id = 4
  point.save
end

1000.times do
  professional = Professional.new
  professional.name = Faker::Name.name
  professional.category = Faker::Company.profession
  professional.description = Faker::Lorem.sentence(word_count: 20)
  professional.image = Faker::Avatar.image
  professional.hourly_wage = Faker::Commerce.price(range: 20...500)
  professional.currency = '$'
  professional.phone_number = Faker::PhoneNumber.cell_phone
  professional.email = Faker::Internet.email
  professional.working_days = 'Mon-Fry'
  professional.save
end
