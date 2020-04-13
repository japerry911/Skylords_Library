Review.destroy_all
Favorite.destroy_all
Book.destroy_all
User.destroy_all
Author.destroy_all

Skylord = User.create(username: 'SkylordPerry', age: 49, password: 'TEST', phone: '402.123.4014', email: 'Skylord@dogmail.com')
Cassidy = User.create(username: 'CassidyHumphrey', age: 24, password: 'TEST', phone: '941.323.9543', email: 'Cassidy@gmail.com')
Jack = User.create(username: 'JackPerry', age: 25, password: 'TEST', phone: '123.343.2331', email: 'Jack@gmail.com')
Troy = User.create(username: 'TroyPerry', age: 56, password: 'TEST', phone: '534.324.5234', email: 'Troy@gmail.com')
Cathy = User.create(username: 'CathyPerry', age: 56, password: 'TEST', phone: '134.234.1235', email: 'Cathy@gmail.com')
Bret = User.create(username: 'BretPerry', age: 27, password: 'TEST', phone: '345.797.5456', email: 'Bret@gmail.com')
Grant = User.create(username: 'GrantPerry', age: 31, password: 'TEST', phone: '654.343.4323', email: 'Grant@gmail.com')
Sarah = User.create(username: 'SarahPerry', age: 30, password: 'TEST', phone: '130.434.1235', email: 'Sarah@gmail.com')

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