Review.destroy_all
Book.destroy_all
Reader.destroy_all
Author.destroy_all

Skylord = Reader.create(name: 'Skylord Perry', age: 49)
Cassidy = Reader.create(name: 'Cassidy Humphrey', age: 24)
Jack = Reader.create(name: 'Jack Perry', age: 25)
Troy = Reader.create(name: 'Troy Perry', age: 56)
Cathy = Reader.create(name: 'Cathy Perry', age: 56)
Bret = Reader.create(name: 'Bret Perry', age: 27)
Grant = Reader.create(name: 'Grant Perry', age: 31)
Sarah = Reader.create(name: 'Sarah Perry', age: 30)

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

Review.create(rating: 5, reader: Cassidy, book: TheKiteRunner)
Review.create(rating: 5, reader: Bret, book: TheHobbit)
Review.create(rating: 5, reader: Grant, book: Ulysses)
Review.create(rating: 4, reader: Cathy, book: TheKiteRunner)
Review.create(rating: 4, reader: Troy, book: WarAndPeace)
Review.create(rating: 4, reader: Bret, book: WarAndPeace)
Review.create(rating: 3, reader: Sarah, book: TheShadowOfTheWind)
Review.create(rating: 3, reader: Grant, book: TheKiteRunner)
Review.create(rating: 3, reader: Jack, book: TheHobbit)
Review.create(rating: 2, reader: Sarah, book: WarAndPeace)
Review.create(rating: 2, reader: Cathy, book: SongOfSolomon)
Review.create(rating: 2, reader: Troy, book: Ulysses)
Review.create(rating: 1, reader: Cassidy, book: TheHobbit)
Review.create(rating: 1, reader: Skylord, book: TheKiteRunner, description: 'This book was dumb.')
Review.create(rating: 1, reader: Skylord, book: WarAndPeace, description: 'Too complicated to read, dumb.')