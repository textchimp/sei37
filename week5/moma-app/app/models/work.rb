class Work < ApplicationRecord
  belongs_to :artist, optional: true
end
