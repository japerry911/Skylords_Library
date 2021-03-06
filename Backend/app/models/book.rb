class Book < ApplicationRecord
    belongs_to :author
    has_many :reviews
    has_many :users, through: :reviews

    before_create :set_uuid
    self.primary_key = :id

    private

    def set_uuid
        self.id = loop do
            random_token = SecureRandom.hex(5)
            break random_token unless self.class.exists? random_token
        end
    end
end
