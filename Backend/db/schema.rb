# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_04_181817) do

  create_table "authors", id: false, force: :cascade do |t|
    t.string "id", null: false
    t.string "name"
    t.string "age"
  end

  create_table "books", id: false, force: :cascade do |t|
    t.string "id", null: false
    t.string "title"
    t.integer "author_id", null: false
    t.index ["author_id"], name: "index_books_on_author_id"
  end

  create_table "readers", id: false, force: :cascade do |t|
    t.string "id", null: false
    t.string "name"
    t.string "age"
  end

  create_table "reviews", id: false, force: :cascade do |t|
    t.string "id", null: false
    t.integer "rating"
    t.integer "reader_id", null: false
    t.integer "book_id", null: false
    t.index ["book_id"], name: "index_reviews_on_book_id"
    t.index ["reader_id"], name: "index_reviews_on_reader_id"
  end

  add_foreign_key "books", "authors"
  add_foreign_key "reviews", "books"
  add_foreign_key "reviews", "readers"
end
