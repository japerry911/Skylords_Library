Review.destroy_all
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

TheKiteRunner = Book.create(title: 'The Kite Runner', author: KhaledHosseini)
TheHobbit = Book.create(title: 'The Hobbit', author: JrrTolkien)
WarAndPeace = Book.create(title: 'War and Peace', author: LeoTolstoy)
SongOfSolomon = Book.create(title: 'Song of Solomon', author: ToniMorrison)
Ulysses = Book.create(title: 'Ulysses', author: JamesJoyce)
TheShadowOfTheWind = Book.create(title: 'The Shadow of the Wind', author: CarlosRuizZafon)

Review.create(rating: 5, user: Cassidy, book: TheKiteRunner)
Review.create(rating: 5, user: Bret, book: TheHobbit)
Review.create(rating: 5, user: Grant, book: Ulysses)
Review.create(rating: 4, user: Cathy, book: TheKiteRunner)
Review.create(rating: 4, user: Troy, book: WarAndPeace)
Review.create(rating: 4, user: Bret, book: WarAndPeace)
Review.create(rating: 3, user: Sarah, book: TheShadowOfTheWind)
Review.create(rating: 3, user: Grant, book: TheKiteRunner)
Review.create(rating: 3, user: Jack, book: TheHobbit)
Review.create(rating: 2, user: Sarah, book: WarAndPeace)
Review.create(rating: 2, user: Cathy, book: SongOfSolomon)
Review.create(rating: 2, user: Troy, book: Ulysses)
Review.create(rating: 1, user: Cassidy, book: TheHobbit)
Review.create(rating: 1, user: Skylord, book: TheKiteRunner, description: 'This book was dumb.')
Review.create(rating: 1, user: Skylord, book: WarAndPeace, description: 'Too complicated to read, dumb.')