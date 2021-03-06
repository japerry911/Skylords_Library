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

ActiveRecord::Schema.define(version: 2020_04_13_152137) do

  create_table "authors", id: :string, force: :cascade do |t|
    t.string "name"
  end

  create_table "books", id: :string, force: :cascade do |t|
    t.string "title"
    t.string "author_id", null: false
    t.string "image_url"
    t.text "description"
    t.index ["author_id"], name: "index_books_on_author_id"
  end

  create_table "favorites", id: :string, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "book_id", null: false
    t.index ["book_id"], name: "index_favorites_on_book_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "reviews", id: :string, force: :cascade do |t|
    t.integer "rating"
    t.text "description"
    t.string "user_id", null: false
    t.string "book_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_id"], name: "index_reviews_on_book_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", id: :string, force: :cascade do |t|
    t.string "username"
    t.integer "age"
    t.string "password_digest"
    t.string "phone"
    t.string "email"
  end

  add_foreign_key "books", "authors"
  add_foreign_key "favorites", "books"
  add_foreign_key "favorites", "users"
  add_foreign_key "reviews", "books"
  add_foreign_key "reviews", "users"
end
