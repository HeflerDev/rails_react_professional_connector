require 'rails_helper'
require 'database_cleaner/active_record'

RSpec.describe 'Professionals', type: :request do
  before :each do
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.clean
  end

  describe 'GET #index' do 
    before(:example) { get '/api/v1/professionals/index' }

    it 'is a success' do 
      expect(response).to have_http_status(:ok)
    end

    it 'return json' do 
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end

  describe 'GET #categories' do 
    before(:example) { get '/api/v1/professionals/categories' }

    it 'is a success' do 
      expect(response).to have_http_status(:ok)
    end

    it 'return json' do 
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end
end

