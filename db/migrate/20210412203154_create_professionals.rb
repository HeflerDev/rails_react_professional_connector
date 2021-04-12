class CreateProfessionals < ActiveRecord::Migration[6.1]
  def change
    create_table :professionals do |t|
      t.string :category
      t.string :name
      t.string :description
      t.string :image
      t.integer :hourly_wage
      t.string :currency
      t.string :phone_number
      t.string :email
      t.string :working_days
      t.timestamps
    end
  end
end
