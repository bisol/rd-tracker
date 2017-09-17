class CreateUserVisits < ActiveRecord::Migration[5.1]
  def change
    create_table :user_visits do |t|
      t.string :path
      t.datetime :timestamp
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
