Review.destroy_all
Favorite.destroy_all
Book.destroy_all
User.destroy_all
Author.destroy_all

Skylord = User.create(username: 'SkylordPerry', age: 49, password: 'TEST')
Cassidy = User.create(username: 'CassidyHumphrey', age: 24, password: 'TEST')
Jack = User.create(username: 'JackPerry', age: 25, password: 'TEST')
Troy = User.create(username: 'TroyPerry', age: 56, password: 'TEST')
Cathy = User.create(username: 'CathyPerry', age: 56, password: 'TEST')
Bret = User.create(username: 'BretPerry', age: 27, password: 'TEST')
Grant = User.create(username: 'GrantPerry', age: 31, password: 'TEST')
Sarah = User.create(username: 'SarahPerry', age: 30, password: 'TEST')

LeoTolstoy = Author.create(name: 'Leo Tolstoy')
ToniMorrison = Author.create(name: 'Toni Morrison')
JamesJoyce = Author.create(name: 'James Joyce')
CarlosRuizZafon = Author.create(name: 'Carlos Ruiz Zafon')
JrrTolkien = Author.create(name: 'J.R.R Tolkien')
KhaledHosseini = Author.create(name: 'Khaled Hosseini')

TheKiteRunner = Book.create(title: 'The Kite Runner', author: KhaledHosseini, 
                            image_url: 'https://images2.penguinrandomhouse.com/cover/9781594631931',
                            description: 'The Kite Runner is a 21st century classic. You’ve already read it? Read it again!')
LoRFellowship = Book.create(title: 'The Fellowship of the Ring', author: JrrTolkien, 
                            image_url: 'https://images3.penguinrandomhouse.com/cover/9780345339706',
                            description: 'The movie is great, but the book is even better!')
WarAndPeace = Book.create(title: 'War and Peace', author: LeoTolstoy, 
                            image_url: 'https://images4.penguinrandomhouse.com/cover/9781400079988',
                            description: 'A legendary masterpiece! Challenge yourself with this classic novel.')
SongOfSolomon = Book.create(title: 'Song of Solomon', author: ToniMorrison, 
                            image_url: 'https://images3.penguinrandomhouse.com/cover/9781400033423',
                            description: 'Don’t miss out on reading a novel by this Nobel Prize winning author.')
Ulysses = Book.create(title: 'Ulysses', author: JamesJoyce, 
                      image_url: 'https://images3.penguinrandomhouse.com/cover/9780679722762',
                      description: 'This is a modernist literature lovers dream!')
TheShadowOfTheWind = Book.create(title: 'The Shadow of the Wind', author: CarlosRuizZafon, 
                                 image_url: 'https://images2.penguinrandomhouse.com/cover/9780143126393',
                                 description: 'An amazing novel that is a must read for all!')

Review.create(rating: 5, user: Cassidy, book: TheKiteRunner)
Review.create(rating: 5, user: Bret, book: LoRFellowship)
Review.create(rating: 5, user: Grant, book: Ulysses)
Review.create(rating: 4, user: Cathy, book: TheKiteRunner)
Review.create(rating: 4, user: Troy, book: WarAndPeace)
Review.create(rating: 4, user: Bret, book: WarAndPeace)
Review.create(rating: 3, user: Sarah, book: TheShadowOfTheWind)
Review.create(rating: 3, user: Grant, book: TheKiteRunner)
Review.create(rating: 3, user: Jack, book: LoRFellowship)
Review.create(rating: 2, user: Sarah, book: WarAndPeace)
Review.create(rating: 2, user: Cathy, book: SongOfSolomon)
Review.create(rating: 2, user: Troy, book: Ulysses)
Review.create(rating: 1, user: Cassidy, book: LoRFellowship)
Review.create(rating: 1, user: Skylord, book: TheKiteRunner, description: 'This book was dumb.')
Review.create(rating: 1, user: Skylord, book: WarAndPeace, description: 'Too complicated to read, dumb.')

Favorite.create(user: Skylord, book: WarAndPeace)
Favorite.create(user: Skylord, book: TheKiteRunner)