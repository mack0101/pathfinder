class CreateMazes < ActiveRecord::Migration[5.1]
  def change
    create_table :mazes do |t|
      t.string :name
      t.text :state
      t.integer :rank
      t.integer :user_id

      t.timestamps
    end
  end
end
