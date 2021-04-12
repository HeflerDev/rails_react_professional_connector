class CreateProfessionals < ActiveRecord::Migration[6.1]
  def change
    create_table :professionals do |t|
      t.string :type
      t.string :name
      t.string :description
      t.string :image

      t.timestamps
    end
  end
end
