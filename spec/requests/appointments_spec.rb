require 'rails_helper'
require 'database_cleaner/active_record'

RSpec.describe 'Appointments', type: :request do
  before :each do
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.clean
  end

  describe 'POST#create' do
    before(:example) { post '/appointments', params: { appointment: { schedule: '12/12/12', user_id: 1, professional_id: 1}}}

    it 'is a success' do
      expect(response).to have_http_status(:ok)
    end

    it 'return JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end
end
